import _ from "lodash"

export default function isEditEventTypeDisabled(eventType: EventTypeFromDB): boolean {
	if (_.isEmpty(eventType.eventTypeName)) {
		return true
	} else if (_.isEmpty(eventType.description)) {
		return true
	} else if (_.isEmpty(eventType.categories)) {
		return true
	}
	return false
}
