import _ from "lodash"
import { useContext, useEffect } from "react"
import { isErrorResponse } from "../../../utils/type-checks"
import EventsClass from "../../../classes/events/events-class"
import AppContext from "../../../contexts/eventfull-it-context"

export default function useRetrieveEventTypes(): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (
			_.isNull(appContext.eventfullApiClient.httpClient.accessToken) ||
			!_.isEmpty(appContext.eventsData?.eventTypes)
		) return
		void retrieveEventTypes()
	}, [appContext.eventfullApiClient.httpClient.accessToken])

	const retrieveEventTypes = async (): Promise<void> => {
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.retrieveEventTypes()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				console.error("Error retrieving event types", response)
				return
			}
			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.assignEventTypes(response.data.eventTypes)
		} catch (error) {
			console.error("Error retrieving event types", error)
		}
	}
}
