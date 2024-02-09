import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../../classes/events/events-class"
import AppContext from "../../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"

export default function useEditEventType(
	previousEventType: EventTypeFromDB | undefined,
	eventType: EventTypeFromDB,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
): (
	e: React.FormEvent<HTMLFormElement>
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const editEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		if (previousEventType === eventType) {
			navigate("/event-types-dashboard")
			return
		}
		setLoading(true)
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.editEventType(
				eventType
			)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to edit event type. Please reload and try again.")
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.editEventType(eventType)
			navigate("/event-types-dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to edit event type")
		} finally {
			setLoading(false)
		}
	}

	return editEvent
}
