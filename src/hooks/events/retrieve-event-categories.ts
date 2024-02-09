import _ from "lodash"
import { useContext, useEffect } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import EventsClass from "../../classes/events/events-class"
import AppContext from "../../contexts/eventfull-it-context"

export default function useRetrieveEventCategories(): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (_.isNull(appContext.eventfullApiClient.httpClient.accessToken)) return
		if (!_.isEmpty(appContext.eventsData?.eventCategories)) return
		void retrieveEventCategories()
	}, [appContext.eventfullApiClient.httpClient.accessToken])

	const retrieveEventCategories = async (): Promise<void> => {
		try {
			const response = await appContext.eventfullApiClient.eventsDataService.retrieveEventCategories()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				console.error("Error retrieving event types", response)
				return
			}
			console.log(response.data)
			if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			appContext.eventsData.assignEventCategories(response.data.eventCategories)
		} catch (error) {
			console.error("Error retrieving event types", error)
		}
	}
}
