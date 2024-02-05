import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

export function calculateEventDurationForNewEvents(eventDetails: CreatingEvent): CreatingEvent {
	if (eventDetails.eventFrequency === "one-time") {
		if (!eventDetails.singularEventTime?.startTime) {
			return eventDetails
		}
		const eventDuration = calculateEventDuration(eventDetails.singularEventTime.startTime, eventDetails.singularEventTime.endTime)
		return { ...eventDetails, singularEventTime: { ...eventDetails.singularEventTime, eventDuration } }
	} else if (eventDetails.eventFrequency === "ongoing") {
		if (!eventDetails.ongoingEventTimes) {
			return eventDetails
		}
		for (const ongoingEventTime of eventDetails.ongoingEventTimes) {
			const eventDuration = calculateEventDuration(ongoingEventTime.startTime, ongoingEventTime.endTime)
			ongoingEventTime.eventDuration = eventDuration
		}
		return eventDetails
	} else {
		if (!eventDetails.customEventDates) {
			return eventDetails
		}
		for (const customEventDate of eventDetails.customEventDates) {
			const eventDuration = calculateEventDuration(customEventDate.startTime, customEventDate.endTime)
			customEventDate.eventDuration = eventDuration
		}
		return eventDetails
	}
}

export function calculateEventDurationForEditEvents(eventDetails: EventFromDB): EventFromDB {
	if (eventDetails.eventFrequency === "one-time") {
		if (!eventDetails.singularEventTime?.startTime) {
			return eventDetails
		}
		const eventDuration = calculateEventDuration(eventDetails.singularEventTime.startTime, eventDetails.singularEventTime.endTime)
		return { ...eventDetails, singularEventTime: { ...eventDetails.singularEventTime, eventDuration } }
	} else if (eventDetails.eventFrequency === "ongoing") {
		for (const ongoingEventTime of eventDetails.ongoingEventTimes) {
			const eventDuration = calculateEventDuration(ongoingEventTime.startTime, ongoingEventTime.endTime)
			ongoingEventTime.eventDuration = eventDuration
		}
		return eventDetails
	} else {
		for (const customEventDate of eventDetails.customEventDates) {
			const eventDuration = calculateEventDuration(customEventDate.startTime, customEventDate.endTime)
			customEventDate.eventDuration = eventDuration
		}
		return eventDetails
	}
}

function calculateEventDuration(startDateTime: Date, endDateTime: Date): { hours: number, minutes: number} {
	const diffInMinutes = dayjs(endDateTime).diff(dayjs(startDateTime), "minute")
	const hours = Math.floor(diffInMinutes / 60)
	const minutes = diffInMinutes % 60

	return { hours, minutes }
}
