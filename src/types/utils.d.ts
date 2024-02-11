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

	interface AdminSocialData {
		adminId: string
		username: string
	}

	interface LoginHistory {
		loginTime: Date
	}
}

export {}
