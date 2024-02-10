import _ from "lodash"
import { useContext, useMemo } from "react"
import AppContext from "../../../contexts/eventfull-it-context"

export default function useIsUpdateEventTypeDisabled(
	newEventType: EventTypeFromDB,
	savedEventType: EventTypeFromDB | undefined,
	setMessage: React.Dispatch<React.SetStateAction<string>>
): boolean {
	const appContext = useContext(AppContext)

	const isUpdateEventTypeDisabled = useMemo(() => {
		setMessage("")
		if (_.isEmpty(newEventType.eventTypeName)) {
			return true
		} else if (
			!_.isUndefined(savedEventType) &&
			newEventType.eventTypeName !== savedEventType.eventTypeName &&
			appContext.eventsData?.eventTypes &&
			Array.from(appContext.eventsData.eventTypes.values()).some(
				eventTypeFromDB => eventTypeFromDB.eventTypeName === newEventType.eventTypeName
			)
		) {
			setMessage(`${newEventType.eventTypeName} already exists`)
			return true
		} else if (_.isEmpty(newEventType.description)) {
			return true
		} else if (_.isEmpty(newEventType.categories)) {
			return true
		}
		return false
	}, [newEventType, appContext.eventsData?.eventTypes, setMessage])

	return isUpdateEventTypeDisabled
}
