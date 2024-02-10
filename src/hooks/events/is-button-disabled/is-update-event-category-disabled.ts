import _ from "lodash"
import { useContext, useMemo } from "react"
import AppContext from "../../../contexts/eventfull-it-context"

export default function useIsUpdateEventCategoryDisabled(
	newEventCategory: EventCategoryFromDB,
	savedEventCategory: EventCategoryFromDB | undefined,
	setMessage: React.Dispatch<React.SetStateAction<string>>
): boolean {
	const appContext = useContext(AppContext)

	const isUpdateEventCategoryDisabled = useMemo(() => {
		setMessage("")
		if (_.isEmpty(newEventCategory.eventCategoryName)) {
			return true
		} else if (
			!_.isUndefined(savedEventCategory) &&
			newEventCategory.eventCategoryName !== savedEventCategory.eventCategoryName &&
			appContext.eventsData?.eventCategories &&
			Array.from(appContext.eventsData.eventCategories.values()).some(
				eventCategoryFromDB => eventCategoryFromDB.eventCategoryName === newEventCategory.eventCategoryName
			)
		) {
			setMessage(`${newEventCategory.eventCategoryName} already exists`)
			return true
		} else if (_.isEmpty(newEventCategory.description)) {
			return true
		}
		return false
	}, [newEventCategory, appContext.eventsData?.eventCategories, setMessage])

	return isUpdateEventCategoryDisabled
}
