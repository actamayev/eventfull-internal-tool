import _ from "lodash"

export default function isAddOrSaveEventDisabled(eventDetails: Partial<CreatingEvent | EventFromDB>): boolean {
	if (_.isEmpty(eventDetails.eventName)) {
		return true
	} else if (_.isEmpty(eventDetails.eventFrequency)) {
		return true
	} else if (_.isEmpty(eventDetails.address)) {
		return true
	} else if (_.isEmpty(eventDetails.eventType)) {
		return true
	}
	return frequencyCheck(eventDetails)
}

export function frequencyCheck (eventDetails: Partial<CreatingEvent | EventFromDB>): boolean {
	if (eventDetails.eventFrequency === "one-time") {
		if (_.isNil(eventDetails.singularEventTime)) return true
		return isTimeInvalid(eventDetails.singularEventTime)
	} else if (eventDetails.eventFrequency === "custom") {
		if (_.isEmpty(eventDetails.customEventDates)) return true
		return eventDetails.customEventDates ? eventDetails.customEventDates.some(isTimeInvalid) : true
	} else if (eventDetails.eventFrequency === "ongoing") {
		if (_.isEmpty(eventDetails.ongoingEventTimes)) return true
		return eventDetails.ongoingEventTimes ? eventDetails.ongoingEventTimes.some(isTimeInvalid) : true
	}
	return true
}

export function checkIfImagesInEditEvent(eventDetails: EventFromDB, selectedImages: File[]): boolean {
	const areAciveImages = eventDetails.eventImages.filter(image => image.isActive)
	const totalImages = areAciveImages.length + selectedImages.length
	return totalImages === 0
}

function isTimeInvalid(eventTime?: BaseEventTime | null): boolean {
	if (!eventTime) return true // Invalid if event time is not provided
	const { startTime, endTime } = eventTime
	return _.isNull(startTime) || _.isNull(endTime) || startTime >= endTime || startTime < new Date()
}
