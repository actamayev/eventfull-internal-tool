declare global {
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
}

export {}
