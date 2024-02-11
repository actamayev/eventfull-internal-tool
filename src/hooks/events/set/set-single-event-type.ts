import _ from "lodash"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"

export default function useSetSingleEventType(
	eventTypeId: string | undefined,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setEventType: React.Dispatch<React.SetStateAction<EventTypeFromDB>>
): EventTypeFromDB | undefined {
	const appContext = useContext(AppContext)
	const [retrievedEventType, setRetrievedEventType] = useState<EventTypeFromDB | undefined>(undefined)

	useEffect(() => {
		if (
			_.isNull(appContext.authClass.accessToken) ||
			_.isNil(appContext.personalData?.username) ||
			_.isNull(appContext.eventsData) ||
			_.isUndefined(eventTypeId)
		) return

		const eventType = appContext.eventsData.eventTypes.get(eventTypeId)
		if (!_.isUndefined(eventType)) {
			setEventType(eventType)
			setRetrievedEventType(eventType)
			return
		}
		void setSingleEvent()
	}, [appContext.authClass.accessToken, appContext.personalData?.username, appContext.eventsData])

	const setSingleEvent = async (): Promise<SingleEventResponse | void> => {
		try {
			if (_.isUndefined(eventTypeId)) return
			const response = await appContext.eventfullApiClient.eventsDataService.getEventTypeById(eventTypeId)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				throw new Error("Failed to retrieve event type")
			}
			setEventType(response.data.eventType)
			setRetrievedEventType(response.data.eventType) // Update the state with the fetched event
		} catch (err) {
			setErrorAxiosResponse(err, setError, "Failed to retrieve event type")
		}
	}

	return retrievedEventType
}
