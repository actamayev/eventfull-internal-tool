declare global {
	interface EventfullEvent extends TimestampsInterface {
		eventId: string
		eventName: string
		eventFrequency: EventFrequency
		isActive: boolean
	}

	type EventFrequency = "one-time" | "repeated" | "regularly-repeated" | "ongoing"
}

export {}
