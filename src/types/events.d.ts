declare global {
	interface EventfullEvent extends TimestampsInterface {
		eventId: string
		eventName: string
		eventFrequency: EventFrequency
		isActive: boolean
	}

	type EventFrequency = "one-time" | "repeated" | "regularly-repeated" | "ongoing"

	type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

	interface DateTimes {
		startDateTime: Date
		endDateTime: Date
	}

	interface OngoingEvents {
		dayOfWeek: DayOfWeek
		startTime: string
		endTime: string
	}

	interface CreatingEvent {
		eventName: string
		eventFrequency: EventFrequency | ""
		address: string
		eventTimeSpanMinutes: {
			hours: number
			minutes: number
		}
		addedBy?: string // TODO: add this: Username of the user who added the event

		// For ongoing events:
		ongoingEventTimes?: OngoingEvents[]

		// For repeated events:
		dates?: DateTimes[]
		// For one time events:
		eventTime?: Date
	}
}

export {}
