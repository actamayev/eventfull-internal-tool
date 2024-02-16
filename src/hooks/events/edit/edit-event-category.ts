import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { isErrorResponses } from "../../../utils/type-checks"
import EventsClass from "../../../classes/events-class"
import AppContext from "../../../contexts/eventfull-it-context"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"

export default function useEditEventCategory(
	previousEventCategory: EventCategoryFromDB | null,
	eventCategory: EventCategoryFromDB,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
): (
	e: React.FormEvent<HTMLFormElement>
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const editEvent = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		if (_.isEqual(previousEventCategory, eventCategory)) {
			navigate("/event-categories-dashboard")
			return
		}
		setLoading(true)
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.editEventCategory(eventCategory)

			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				setError("Unable to edit event category. Please reload and try again.")
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.editEventCategory(eventCategory)
			navigate("/event-categories-dashboard")
		} catch (error) {
			setErrorAxiosResponse(error, setError, "Unable to edit event category")
		} finally {
			setLoading(false)
		}
	}

	return editEvent
}
