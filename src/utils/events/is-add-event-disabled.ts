import _ from "lodash"

export default function isEventDisabled(eventDetails: CreatingEvent): boolean {
	if (_.isEmpty(eventDetails.eventName)) {
		return true
	} else if (_.isEmpty(eventDetails.address)) {
		return true
	} else if (_.isEmpty(eventDetails.eventTimeSpanMinutes)) {
		return true
	} else if (eventDetails.eventFrequency === "one-time" && _.isEmpty(eventDetails.eventTime)) {
		return true
	} else if (eventDetails.eventFrequency !== "one-time" && _.isEmpty(eventDetails.dates)) {
		return true
	} else {
		return false
	}
}
