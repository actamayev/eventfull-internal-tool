export default function createEventCategoriesArrayForGrid(
	eventsCategories: Map<string, CreatingEventCategory>
): EventCategoriesGridRowData[] {
	const eventsCategoriesArray = Array.from(eventsCategories.entries()).map(([key, value]) => ({
		eventCategoryId: key,
		eventCategory: value.eventCategoryName,
		description: value.description,
	}))

	return eventsCategoriesArray
}
