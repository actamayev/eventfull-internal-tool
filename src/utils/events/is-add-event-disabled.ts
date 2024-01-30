import _ from "lodash"

export default function isEventDisabled(eventDetails: CreatingEvent): boolean {
	if (_.isEmpty(eventDetails.eventName)) {
		return true
	} else if (_.isEmpty(eventDetails.address)) {
		return true
	} else if (_.isEmpty(eventDetails.eventDuration)) {
		return true
	}
	return frequencyCheck(eventDetails)
}

const frequencyCheck = (eventDetails: CreatingEvent): boolean => {
	if (eventDetails.eventFrequency === "one-time") {
		return _.isNull(eventDetails.eventTime)
	} else if (eventDetails.eventFrequency === "repeated") {
		return _.isEmpty(eventDetails.dates)
	} else if (eventDetails.eventFrequency === "ongoing") {
		return _.isEmpty(eventDetails.ongoingEventTimes)
	} else {
		return true
	}
}
