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
	type PersonalInfoLoginSuccess = {
		firstName: string
		lastName: string
		email: string
		username: string
	}

	type LoginSuccess = PersonalInfoLoginSuccess & {
		accessToken: string
	}

	type AccesTokenResponse = { accessToken: string }

	// Personal Info:
	type PersonalInfoResponse = { personalInfo: PersonalInfoLoginSuccess }

	// Events:
	type SingleEventResponse = { event: EventFromDB }
	type EventsResponse = { events: EventFromDB[] }

	interface EventFromDB extends TimestampsInterface {
		_id: string
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
