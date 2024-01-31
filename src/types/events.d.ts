declare global {
	interface EventfullEvent extends TimestampsInterface {
		eventId: string
		eventName: string
		eventFrequency: EventFrequency
		isActive: boolean
	}

	// One-time events are self-explanatory.
	// Ongoing is something that can be attended at any time (ie rock climbing)
	// Custom events are things like broadway shows, which are repeated but not regularly
	type EventFrequency = "one-time" | "custom" | "ongoing"

	type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

	interface BaseEventTime {
		startTime: Date | null
		endTime: Date | null
		eventDuration: {
			hours: number
			minutes: number
		}
	}

	interface OngoingEvents extends BaseEventTime {
		dayOfWeek: DayOfWeek
	}

	interface CreatingEvent {
		eventName: string
		eventPrice: number
		eventType: string
		isVirtual: boolean
		isActive: boolean
		eventPublic: boolean
		eventReviewable: boolean
		canInvitedUsersInviteOthers: boolean
		eventFrequency: EventFrequency | ""
		address: string
		eventDescription: string

		eventURL?: string
		extraEventCategories?: string[]
		eventImageURL?: string

		// For one time events:
		singularEventTime?: BaseEventTime | null

		// For custom events:
		customEventDates?: BaseEventTime[]

		// For ongoing events:
		ongoingEventTimes?: OngoingEvents[]
		invitees: SocialData[]
		coHosts: SocialData[]
		eventCapacity: number
	}

	interface GridRowData {
		eventName: string
		eventDescription: string
		address: string
		createdByUsername: string
	}
}

export {}
