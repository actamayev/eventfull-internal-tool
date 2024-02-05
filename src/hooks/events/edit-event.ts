import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import { calculateEventDurationForEditEvents } from "../../utils/events/calculate-event-duration"

export default function useEditEvent(
	previousEventDetails: EventFromDB | undefined,
	eventDetails: EventFromDB,
	selectedFiles: File[],
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
): (
	e: React.FormEvent<HTMLFormElement>
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const editEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		const eventDetailsWithEventDuration = calculateEventDurationForEditEvents(eventDetails)
		if (previousEventDetails === eventDetailsWithEventDuration) {
			navigate("/dashboard")
			return
		}
		setLoading(true)
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.editEvent(eventDetailsWithEventDuration)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to edit event. Please reload and try again.")
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.editEvent(response.data.updatedEvent)
			navigate("/dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to edit event")
		} finally {
			setLoading(false)
		}
	}

	return editEvent
}
