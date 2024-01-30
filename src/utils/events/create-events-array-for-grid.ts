import EventClass from "../../classes/events/event-class"

export default function createEventsArrayForGrid(eventsData: Map<string, EventClass>): GridRowData[] {
	const eventsArray = eventsData instanceof Map
		? Array.from(eventsData.values())
		: eventsData

	return eventsArray.map(event => ({
		eventName: event.eventName,
		eventDescription: event.eventDescription,
		address: event.address,
		createdByUsername: event.createdBy.username
	}))
}

