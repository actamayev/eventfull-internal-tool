import _ from "lodash"
import { useContext, useEffect } from "react"
import { isErrorResponse } from "../../../utils/type-checks"
import EventsClass from "../../../classes/events/events-class"
import AppContext from "../../../contexts/eventfull-it-context"

export default function useRetrieveEvents(): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (
			_.isNull(appContext.eventfullApiClient.httpClient.accessToken) ||
			!_.isEmpty(appContext.eventsData?.eventsMap)
		) return
		void retrieveEvents()
	}, [appContext.eventfullApiClient.httpClient.accessToken])

	const retrieveEvents = async (): Promise<void> => {
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.getEvents()

			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				console.error(response)
				return
			}

			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			for (const event of response.data.events) {
				appContext.eventsData.addEvent(event)
			}
		} catch (error) {
			console.error(error)
		}
	}
}
