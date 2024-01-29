declare global {
	interface EventfullEvent extends TimestampsInterface {
		eventId: string
		eventName: string
		eventFrequency: EventFrequency
		isActive: boolean
	}

	type EventFrequency = "one-time" | "repeated" | "regularly-repeated" | "ongoing"

	interface DateTimes {
		startDateTime: Date
		endDateTime: Date
	}

	interface CreatingEvent {
		eventName: string
		eventFrequency: EventFrequency | ""
		address: string
		eventTimeSpanMinutes: number

		// For repeated events:
		dates?: DateTimes[]
		// For one time events:
		eventTime?: Date
	}
}

export {}
