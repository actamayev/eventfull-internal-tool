export default function createEventTypesArrayForGrid(eventsTypes: Map<string, CreatingEventType>): EventTypesGridRowData[] {
	const eventsTypesArray = Array.from(eventsTypes.entries()).map(([key, value]) => ({
		eventTypeId: key,
		eventType: value.eventTypeName,
		description: value.description,
		categories: value.categories,
	}))

	return eventsTypesArray
}
