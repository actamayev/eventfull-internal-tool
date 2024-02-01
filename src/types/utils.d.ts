declare global {
	interface TimestampsInterface {
		createdAt: Date
		updatedAt: Date
	}

	interface SocialData {
		userId: string
		username: string
	}

	interface SocialDataWithTimestamp extends SocialData {
		createdAt: Date
	}
}

export {}
