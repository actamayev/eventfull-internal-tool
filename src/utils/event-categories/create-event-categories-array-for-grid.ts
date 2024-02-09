import formatReadableDate from "../format-readable-date"

export default function createEventCategoriesArrayForGrid(
	eventsCategories: Map<string, EventCategoryFromDB>
): EventCategoriesGridRowData[] {
	const eventsCategoriesArray = Array.from(eventsCategories.entries()).map(([key, value]) => ({
		eventCategoryId: key,
		eventCategory: value.eventCategoryName,
		description: value.description,
		createdAt: formatReadableDate(value.createdAt),
		createdBy: value.createdBy.username,
	}))

	return eventsCategoriesArray
}
