import _ from "lodash"
import { useContext, useEffect } from "react"
import AppContext from "../../contexts/eventfull-it-context"
import { isErrorResponses } from "../../utils/type-checks"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useSetSingleEvent(
	eventId: string | undefined,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setEventDetails: (value: React.SetStateAction<EventFromDB>) => void
): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (
			_.isNull(appContext.authClass.accessToken) ||
			_.isNil(appContext.personalData?.username) ||
			_.isNull(appContext.eventsData) ||
			_.isUndefined(eventId)
		) return

		const event = appContext.eventsData.contextForEvent(eventId)
		if (!_.isUndefined(event)) {
			setEventDetails(event)
		} else {
			void setSingleEvent()
		}
	}, [appContext.authClass.accessToken, appContext.personalData?.username, appContext.eventsData])

	const setSingleEvent = async (): Promise<SingleEventResponse | void> => {
		try {
			if (_.isUndefined(eventId)) return
			const response = await appContext.eventfullApiClient.eventsDataService.getEventById(eventId)
			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				throw new Error("Failed to retrieve event")
			}

			if (_.isNull(response.data.event)) return
			setEventDetails(response.data.event)
		} catch (err) {
			setErrorAxiosResponse(err, setError, "Failed to retrieve event")
		}
	}
}
