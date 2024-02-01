import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useAddEvent(): (
	e: React.FormEvent<HTMLFormElement>,
	eventDetails: CreatingEvent,
	setError: React.Dispatch<React.SetStateAction<string>>
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const addEventSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		eventDetails: CreatingEvent,
		setError: React.Dispatch<React.SetStateAction<string>>
	): Promise<void> => {
		e.preventDefault()
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.addEvent(eventDetails)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to add event. Please reload and try again.")
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.addEvent(response.data.newEvent)
			navigate("/dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to add event")
		}
	}

	return addEventSubmit
}
