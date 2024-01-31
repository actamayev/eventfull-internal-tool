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
		attendees: string[]
		canInvitedUsersInviteOthers: boolean
		coHosts: string[]
		createdBy: {
			createdAt: Date
			isCreatedByAdmin: boolean
			userId: string
			username: string
		}
		eventCapacity: number | null
		eventDescription: string
		eventDuration: {
			hours: number
			minutes: number
		}
		eventEndTime: Date
		eventName: string
		eventPrice: number
		eventPublic: boolean
		eventReviewable: boolean
		eventStartTime: Date
		eventType: string
		eventURL: string | null
		extraEventCategories: string[]
		invitees: string[]
		isActive: boolean
		isVirtual: boolean
	}
}

export {}
