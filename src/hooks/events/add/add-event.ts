import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../../classes/events/events-class"
import AppContext from "../../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import uploadImageLoop from "../../../utils/events/upload-image-loop"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"
import { calculateEventDurationForNewEvents } from "../../../utils/events/calculate-event-duration"

export default function useAddEvent(
	eventDetails: CreatingEvent,
	selectedFiles: File[],
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const addEventSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setLoading(true)
		try {
			const eventDetailsWithEventDuration = calculateEventDurationForNewEvents(eventDetails)
			const response = await appContext.eventfullApiClient.eventsDataService.addEvent(
				eventDetailsWithEventDuration, _.size(selectedFiles)
			)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to add event. Please reload and try again.")
				return
			}
			if (!_.isEmpty(response.data.imagesURLsData)) {
				const imageURLs = await uploadImageLoop(selectedFiles, response.data.imagesURLsData)

				response.data.newEvent.eventImages = imageURLs
				await appContext.eventfullApiClient.eventsDataService.addEventImages(response.data.newEvent._id, imageURLs)
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.addEvent(response.data.newEvent)
			navigate("/events-dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to add event")
		} finally {
			setLoading(false)
		}
	}

	return addEventSubmit
}
