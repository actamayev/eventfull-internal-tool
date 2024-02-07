export default function createEventTypesArrayForGrid(eventsTypes: Map<string, EventTypeFromDB>): EventTypesGridRowData[] {
	const eventsTypesArray = eventsTypes instanceof Map
		? Array.from(eventsTypes.values())
		: eventsTypes

	return eventsTypesArray
		// .filter(eventType => eventType.isActive)
		.map(eventType => ({
			eventTypeId: eventType._id,
			eventType: eventType.name,
			description: eventType.description,
			categories: eventType.categories,
			// createdAt: eventType.createdAt,
		}))
}

