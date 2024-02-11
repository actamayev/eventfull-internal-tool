import formatReadableDate from "../format-readable-date"

export default function createEventTypesArrayForGrid(
	eventsTypes: Map<string, EventTypeFromDB>
): EventTypesGridRowData[] {
	const eventsTypesArray = Array.from(eventsTypes.entries()).map(([key, value]) => ({
		id: key,
		eventType: value.eventTypeName,
		description: value.description,
		categories: value.categories.map((category) => category.eventCategoryName),
		createdAt: formatReadableDate(value.createdAt),
		createdBy: value.createdBy.username,
	}))

	return eventsTypesArray
}
