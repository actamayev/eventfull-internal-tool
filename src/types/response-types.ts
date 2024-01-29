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
	type NewEventResponse = {
		eventId: string
		eventName: string
		eventFrequency: EventFrequency
		isActive: boolean
		createdAt: Date
		updatedAt: Date
	}
}

export {}
