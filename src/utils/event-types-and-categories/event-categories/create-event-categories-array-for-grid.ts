export default function createEventCategoriesArrayForGrid(
	eventsCategories: Map<string, EventCategoryFromDB>
): EventCategoriesGridRowData[] {
	const eventsCategoriesArray = eventsCategories instanceof Map
		? Array.from(eventsCategories.values())
		: eventsCategories

	return eventsCategoriesArray
		// .filter(eventCategory => eventCategory.isActive)
		.map(eventCategory => ({
			eventCategoryId: eventCategory._id,
			eventCategory: eventCategory.eventCategory,
			description: eventCategory.description,
			// createdAt: eventCategory.createdAt,
		}))
}

