declare global {
	// Common Responses:
	type SuccessResponse = { success: string }
	type MessageResponse = { message: string }
	type ValidationErrorResponse = { validationError: string }
	type ErrorResponse = { error: string }
	type ErrorResponses = ValidationErrorResponse | ErrorResponse
	type NonSuccessResponse = MessageResponse | ErrorResponses
	type AllCommonResponses = SuccessResponse | NonSuccessResponse

	// Auth:
	type PersonalInfo = {
		firstName: string
		lastName: string
		email: string
		username: string
	}

	type LoginSuccess = PersonalInfo & {
		accessToken: string
	}

	type OTPLoginPersonalInfo = {
		accessToken: string
		email: string
		firstName: string
		lastName: string
	}

	type AccessTokenResponse = { accessToken: string }

	// Personal Info:
	type PersonalInfoResponse = { personalInfo: PersonalInfo }

	// Events:
	type SingleEventResponse = { newEvent: EventFromDB }
	type EventsResponse = { events: EventFromDB[] }

	interface EventFromDB extends TimestampsInterface {
		_id: string // This is actually Types.ObjectId, but I don't want to import it here
		address: string
		attendees: EventfullAttendee[]
		canInvitedUsersInviteOthers: boolean
		coHosts: EventfullCoHost[]
		createdBy: {
			createdAt: Date
			isCreatedByAdmin: boolean
			userId: string
			username: string
		}
		customEventDates: EventfullBaseEventTime[]
		eventCapacity: number | null
		eventDescription: string
		eventFrequency: EventFrequency
		eventImageURL?: string
		eventName: string
		eventPrice: number
		eventPublic: boolean
		eventReviewable: boolean
		eventType: string
		eventURL?: string
		extraEventCategories: string[]
		invitees: EventfullInvitee[]
		isActive: boolean
		isVirtual: boolean
		ongoingEventTimes: EventfullOngoingEventTime[]
		singularEventTime: EventfullBaseEventTime | null
		organizer?: SocialData
	}
}

export {}
