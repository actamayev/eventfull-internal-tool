import _ from "lodash"

export default function isEditEventCategoryDisabled(eventCategory: EventCategoryFromDB): boolean {
	if (_.isEmpty(eventCategory.eventCategoryName)) {
		return true
	} else if (_.isEmpty(eventCategory.description)) {
		return true
	}
	return false
}
