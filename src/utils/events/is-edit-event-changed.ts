import _ from "lodash"

export default function isEditEventChanged(
	eventDetails: EventFromDB,
	retrievedEvent: EventFromDB | null,
	selectedImages: File[]
): boolean {
	if (!_.isEmpty(selectedImages)) return true
	if (_.isNull(retrievedEvent)) return true

	const { customEventDates, ongoingEventTimes, singularEventTime, ...eventDetailsWithoutDates } = eventDetails
	const {
		customEventDates: retrievedCustomEvents,
		ongoingEventTimes: retrievedOngoingEventTimes,
		singularEventTime: retrievedSingularEventTime,
		...retrievedEventWithoutDates
	} = retrievedEvent


	if (!_.isEqual(eventDetailsWithoutDates, retrievedEventWithoutDates)) return true

	if (eventDetails.eventFrequency === "custom") {
		if (!_.isEqual(customEventDates, retrievedCustomEvents)) return true
	} else if (eventDetails.eventFrequency === "ongoing") {
		if (!_.isEqual(ongoingEventTimes, retrievedOngoingEventTimes)) return true
	} else {
		if (!_.isEqual(singularEventTime, retrievedSingularEventTime)) return true
	}

	return false
}
