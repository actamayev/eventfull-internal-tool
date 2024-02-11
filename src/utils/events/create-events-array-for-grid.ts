import formatReadableDate from "../format-readable-date"
import EventClass from "../../classes/events/event-class"

export default function createEventsArrayForGrid(eventsData: Map<string, EventClass>): EventGridRowData[] {
	const eventsArray = eventsData instanceof Map
		? Array.from(eventsData.values())
		: eventsData

	return eventsArray
		.filter(event => event.isActive)
		.map(event => ({
			id: event._id,
			eventName: event.eventName,
			eventDescription: event.eventDescription,
			address: event.address,
			createdByUsername: event.createdBy.username,
			createdAt: formatReadableDate(event.createdAt),
			updatedAt: formatReadableDate(event.updatedAt)
		}))
}
