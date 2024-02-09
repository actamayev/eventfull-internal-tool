import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useAddEventType(
	eventTypeDetails: CreatingEventType,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const addEventTypeSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.addEventType(eventTypeDetails)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to add event type. Please reload and try again.")
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.addEventType(response.data.eventType)
			navigate("/event-types-dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to add event type")
		} finally {
			setLoading(false)
		}
	}

	return addEventTypeSubmit
}
