import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import uploadFileToS3 from "../../utils/upload-file-to-aws"

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
		try {
			setLoading(true)
			const response = await appContext.eventfullApiClient.eventsDataService.addEvent(eventDetails, _.size(selectedFiles))

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to add event. Please reload and try again.")
				return
			}
			const imageURLs: ImageURLs[] = response.data.imagesURLsData.map((imageURLData) => ({
				imageId: imageURLData.imageId, imageURL: ""
			}))

			for (let i = 0; i < _.size(selectedFiles); i++) {
				const file = selectedFiles[i]
				const imageId = response.data.imagesURLsData[i].imageId
				const presignedUrl = response.data.imagesURLsData[i].presignedUrl
				const uploadedImageUrl = await uploadFileToS3(file, presignedUrl)

				// Find the corresponding object in imageURLs array and update its imageURL
				const index = imageURLs.findIndex(item => item.imageId === imageId)
				if (index !== -1) imageURLs[index].imageURL = uploadedImageUrl
			}

			response.data.newEvent.eventImages = imageURLs
			await appContext.eventfullApiClient.eventsDataService.addEventImages(response.data.newEvent._id, imageURLs)

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.addEvent(response.data.newEvent)
			navigate("/dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to add event")
		} finally {
			setLoading(false)
		}
	}

	return addEventSubmit
}
