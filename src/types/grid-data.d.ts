declare global {
	interface EventGridRowData {
		eventId: string
		eventName: string
		eventDescription: string
		address: string
		createdByUsername: string
		createdAt: string
		updatedAt: string
	}

	interface UserGridRowData {
		userId: string
		firstName: string
		numberOfFriends: number
		lastName?: string
		username?: string
		email?: string
		phoneNumber?: string

		lastLogin: string
		createdAt: string
	}

	interface EventCategoriesGridRowData {
		eventCategoryId: string
		eventCategory: string
		description: string
		createdAt: string
	}

	interface EventTypesGridRowData {
		eventTypeId: string
		eventType: string
		description: string
		categories: string[]
		// createdAt: string
	}
}

export {}
