import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddEvent(): (
	e: React.FormEvent<HTMLFormElement>,
	eventDetails: CreatingEvent
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()
	const addEventSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		eventDetails: CreatingEvent
	): Promise<void> => {
		e.preventDefault()
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.addEvent(eventDetails)

			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				console.error(response)
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.addEvent(response.data)
			navigate("/dashboard")
		} catch (error) {
			console.error(error)
		}
	}

	return addEventSubmit
}
