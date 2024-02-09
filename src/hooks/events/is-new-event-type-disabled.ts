import _ from "lodash"
import { useContext, useMemo } from "react"
import AppContext from "../../contexts/eventfull-it-context"

export default function useIsNewEventTypeDisabled(
	eventType: CreatingEventType,
	setMessage: React.Dispatch<React.SetStateAction<string>>
): boolean {
	const appContext = useContext(AppContext)

	const isNewEventTypeDisabled = useMemo(() => {
		setMessage("")
		if (_.isEmpty(eventType.eventTypeName)) {
			return true
		} else if (
			appContext.eventsData?.eventTypes &&
			Array.from(appContext.eventsData.eventTypes.values()).some(
				eventTypeFromDB => eventTypeFromDB.eventTypeName === eventType.eventTypeName
			)
		) {
			setMessage(`${eventType.eventTypeName} already exists`)
			return true
		}  else if (_.isEmpty(eventType.description)) {
			return true
		} else if (_.isEmpty(eventType.categories)) {
			return true
		}
		return false
	}, [eventType, appContext.eventsData?.eventTypes, setMessage])

	return isNewEventTypeDisabled
}
