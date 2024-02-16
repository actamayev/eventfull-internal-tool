import _ from "lodash"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../../utils/type-checks"
import setErrorAxiosResponse from "../../../utils/error-handling/set-error-axios-response"

export default function useSetSingleEventCategory(
	eventCategoryId: string | undefined,
	setError: React.Dispatch<React.SetStateAction<string>>,
	setEventCategory: React.Dispatch<React.SetStateAction<EventCategoryFromDB>>
): EventCategoryFromDB | null {
	const appContext = useContext(AppContext)
	const [retrievedEventCategory, setRetrievedEventCategory] = useState<EventCategoryFromDB | null>(null)

	useEffect(() => {
		if (
			_.isNull(appContext.authClass.accessToken) ||
			_.isNil(appContext.personalData?.username) ||
			_.isNull(appContext.eventsData) ||
			_.isUndefined(eventCategoryId)
		) return

		const eventCategory = appContext.eventsData.eventCategories.get(eventCategoryId)
		if (_.isUndefined(eventCategory)) {
			void setSingleEvent()
			return
		}
		setEventCategory(eventCategory)
		setRetrievedEventCategory(eventCategory)
	}, [appContext.authClass.accessToken, appContext.personalData?.username, appContext.eventsData])

	const setSingleEvent = async (): Promise<SingleEventResponse | void> => {
		try {
			if (_.isUndefined(eventCategoryId)) return
			const response = await appContext.eventfullApiClient.eventsDataService.getEventCategoryById(eventCategoryId)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				throw new Error("Failed to retrieve event category")
			}
			setEventCategory(response.data.eventCategory)
			setRetrievedEventCategory(response.data.eventCategory) // Update the state with the fetched event
		} catch (err) {
			setErrorAxiosResponse(err, setError, "Failed to retrieve event category")
		}
	}

	return retrievedEventCategory
}
