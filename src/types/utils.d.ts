declare global {
	interface TimestampsInterface {
		createdAt: Date
		updatedAt: Date
	}

	interface IDInterface {
		_id: string
	}

	interface SocialData {
		userId: string
		username: string
	}

	interface SocialDataWithTimestamp extends SocialData {
		createdAt: Date
	}

	interface LoginHistory {
		loginTime: Date
	}
}

export {}
