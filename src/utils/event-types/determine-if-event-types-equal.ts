export default function determineIfEventTypesEqual(
	eventType1: EventTypeFromDB,
	eventType2: EventTypeFromDB
): boolean {
	return (
		eventType1.eventTypeName === eventType2.eventTypeName &&
		eventType1.description === eventType2.description &&
		areCategoriesEquivalent(eventType1, eventType2)
	)
}

function areCategoriesEquivalent(eventType1: EventTypeFromDB, eventType2: EventTypeFromDB): boolean {
	if (eventType1.categories.length !== eventType2.categories.length) {
		return false
	}

	const sortedCategories1 = eventType1.categories
		.map(cat => ({ categoryId: cat.categoryId, eventCategoryName: cat.eventCategoryName }))
		.sort((a, b) => a.categoryId.localeCompare(b.categoryId))

	const sortedCategories2 = eventType2.categories
		.map(cat => ({ categoryId: cat.categoryId, eventCategoryName: cat.eventCategoryName }))
		.sort((a, b) => a.categoryId.localeCompare(b.categoryId))

	return sortedCategories1.every((cat1, index) => {
		const cat2 = sortedCategories2[index]
		return cat1.categoryId === cat2.categoryId && cat1.eventCategoryName === cat2.eventCategoryName
	})
}
