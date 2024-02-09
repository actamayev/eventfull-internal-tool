import _ from "lodash"
import { useContext, useMemo } from "react"
import AppContext from "../../contexts/eventfull-it-context"

export default function useIsNewEventCategoryDisabled(
	eventCategory: CreatingEventCategory,
	setMessage: React.Dispatch<React.SetStateAction<string>>
): boolean {
	const appContext = useContext(AppContext)

	const isNewEventCategoryDisabled = useMemo(() => {
		setMessage("")
		if (_.isEmpty(eventCategory.eventCategoryName)) {
			return true
		} else if (
			appContext.eventsData?.eventCategories &&
			Array.from(appContext.eventsData.eventCategories.values()).some(
				eventCategoryFromDB => eventCategoryFromDB.eventCategoryName === eventCategory.eventCategoryName
			)
		) {
			setMessage(`${eventCategory.eventCategoryName} already exists`)
			return true
		} else if (_.isEmpty(eventCategory.description)) {
			return true
		}
		return false
	}, [eventCategory, appContext.eventsData?.eventCategories, setMessage])

	return isNewEventCategoryDisabled
}
