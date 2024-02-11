declare global {
	// One-time events are self-explanatory.
	// Ongoing is something that can be attended at any time (ie rock climbing)
	// Custom events are things like broadway shows, which are repeated but not regularly
	type EventFrequency = "one-time" | "custom" | "ongoing"

	type DayOfWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

	interface BaseEventTime {
		startTime: Date
		endTime: Date
		eventDuration?: {
			hours: number
			minutes: number
		}
	}

	interface OngoingEvents extends BaseEventTime {
		dayOfWeek: DayOfWeek
	}

	interface ExtraEventCategory {
		categoryId: string
		eventCategoryName: string
	}

	interface CreatingEvent {
		eventName: string
		eventPrice: number
		eventType: {
			eventTypeId: string
			eventTypeName: string
		}
		isVirtual: boolean
		isActive: boolean
		eventPublic: boolean
		eventReviewable: boolean
		canInvitedUsersInviteOthers: boolean
		eventFrequency: EventFrequency | ""
		address: string
		eventDescription: string

		eventURL?: string
		extraEventCategories?: ExtraEventCategory[]

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

	interface SendingCreateEvent extends CreatingEvent {
		eventType: string
		extraEventCategories: string[]
	}

	interface ImageURLs {
		imageId: string
		imageURL?: string
		isActive: boolean
	}

	interface EventfullInvitee {
		user: SocialData
		attendingStatus: "Not Attending" | "Not Responded"
		invitedBy: SocialDataWithTimestamp
	}

	interface EventfullAttendee {
		user: SocialData
		invitedBy?: SocialDataWithTimestamp
		reviewRating?: number
		reviewText?: string
	}

	interface EventfullCoHost {
		user: SocialData
		invitedBy: SocialDataWithTimestamp
	}

	interface CreatingEventCategory {
		eventCategoryName: string
		description: string
	}

	interface CreatingEventType {
		eventTypeName: string
		description: string
		categories: {
			categoryId: string
			eventCategoryName: string
			description: string
		}[]
	}

	interface SendingUpdateEvent extends EventFromDB {
		eventType: string
		extraEventCategories: string[]
	}
}

export {}
