import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../../classes/events/events-class"
import AppContext from "../../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"
import { calculateEventDurationForEditEvents } from "../../../utils/events/calculate-event-duration"
import uploadFileToS3 from "../../../utils/upload-file-to-aws"

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
		if (previousEventDetails === eventDetailsWithEventDuration && _.isEmpty(selectedFiles)) {
			navigate("/events-dashboard")
			return
		}
		setLoading(true)
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.editEvent(
				eventDetailsWithEventDuration, _.size(selectedFiles)
			)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to edit event. Please reload and try again.")
				return
			}
			if (!_.isEmpty(response.data.imagesURLsData)) {
				const imageURLs: ImageURLs[] = response.data.imagesURLsData.map((imageURLData) => ({
					imageId: imageURLData.imageId, imageURL: "", isActive: true
				}))

				for (let i = 0; i < _.size(selectedFiles); i++) {
					const file = selectedFiles[i]
					const imageId = response.data.imagesURLsData[i].imageId
					const presignedUrl = response.data.imagesURLsData[i].presignedUrl
					const uploadedImageUrl = await uploadFileToS3(file, presignedUrl)

					// Find the corresponding object in imageURLs array and update its imageURL
					const index = imageURLs.findIndex(item => item.imageId === imageId)
					// eslint-disable-next-line max-depth
					if (index !== -1) imageURLs[index].imageURL = uploadedImageUrl
				}

				const allEventImages = _.concat(eventDetails.eventImages, imageURLs)

				response.data.updatedEvent.eventImages = allEventImages
				await appContext.eventfullApiClient.eventsDataService.addEventImages(response.data.updatedEvent._id, imageURLs)
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.editEvent(response.data.updatedEvent)
			navigate("/events-dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to edit event")
		} finally {
			setLoading(false)
		}
	}

	return editEvent
}
