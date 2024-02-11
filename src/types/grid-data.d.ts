declare global {
	interface EventGridRowData {
		id: string
		eventName: string
		eventDescription: string
		address: string
		createdByUsername: string
		createdAt: string
		updatedAt: string
	}

	interface UserGridRowData {
		id: string
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
		id: string
		eventCategory: string
		description: string
		createdAt: string
		createdBy: string
	}

	interface EventTypesGridRowData {
		id: string
		eventType: string
		description: string
		categories: string[]
		createdAt: string
		createdBy: string
	}
}

export {}
