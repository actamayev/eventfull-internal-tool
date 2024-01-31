declare global {
	interface TimestampsInterface {
		createdAt: Date
		updatedAt: Date
	}

	interface SocialData {
		userId: Types.ObjectId
		username: string
	}
}

export {}
