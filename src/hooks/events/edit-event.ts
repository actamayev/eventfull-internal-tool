import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useEditEvent(): (
	e: React.FormEvent<HTMLFormElement>,
	eventDetails: EventFromDB,
	setError: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const editEvent = async (
		e: React.FormEvent<HTMLFormElement>,
		eventDetails: EventFromDB,
		setError: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		e.preventDefault()
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.editEvent(eventDetails)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to edit event. Please reload and try again.")
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.editEvent(response.data.newEvent)
			navigate("/dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to edit event")
		}
	}

	return editEvent
}
