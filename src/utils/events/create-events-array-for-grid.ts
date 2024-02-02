import dayjs from "dayjs"
import EventClass from "../../classes/events/event-class"

export default function createEventsArrayForGrid(eventsData: Map<string, EventClass>): GridRowData[] {
	const eventsArray = eventsData instanceof Map
		? Array.from(eventsData.values())
		: eventsData

	return eventsArray
		.filter(event => event.isActive)
		.map(event => ({
			eventId: event._id,
			eventName: event.eventName,
			eventDescription: event.eventDescription,
			address: event.address,
			createdByUsername: event.createdBy.username,
			createdAt: formatReadableDate(event.createdAt),
			updatedAt: formatReadableDate(event.updatedAt)
		}))
}

function formatReadableDate(date: Date): string {
	return dayjs(date).format("MMMM D, YYYY, [at] h:mmA")
}
