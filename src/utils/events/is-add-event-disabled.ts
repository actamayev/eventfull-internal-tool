import _ from "lodash"

export default function isEventDisabled(eventDetails: CreatingEvent): boolean {
	if (_.isEmpty(eventDetails.eventName)) {
		return true
	} else if (_.isEmpty(eventDetails.eventFrequency)) {
		return true
	} else if (_.isEmpty(eventDetails.address)) {
		return true
	}
	return frequencyCheck(eventDetails)
}

function frequencyCheck (eventDetails: CreatingEvent): boolean {
	if (eventDetails.eventFrequency === "one-time") {
		return _.isNull(eventDetails.singularEventTime)
	} else if (eventDetails.eventFrequency === "custom") {
		return _.isEmpty(eventDetails.customEventDates)
	} else if (eventDetails.eventFrequency === "ongoing") {
		return _.isEmpty(eventDetails.ongoingEventTimes)
	} else {
		return true
	}
}
