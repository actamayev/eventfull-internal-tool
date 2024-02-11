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
	type ImageURLsResponse = { imageId: string, presignedUrl: string }
	type NewEventResponse = { newEvent: EventFromDB, imagesURLsData: ImageURLsResponse[] }
	type UpdatedEventResponse = { updatedEvent: EventFromDB, imagesURLsData: ImageURLsResponse[] }
	type EventsResponse = { events: EventFromDB[] }
	type SingleEventResponse = { event: EventFromDB }

	interface EventFromDB extends TimestampsInterface, IDInterface {
		__v: number
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
		customEventDates: BaseEventTime[]
		eventCapacity: number | null
		eventDescription: string
		eventImages: ImageURLs[]

		eventFrequency: EventFrequency
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
		ongoingEventTimes: OngoingEvents[]
		singularEventTime?: BaseEventTime
		organizer?: SocialData
	}

	type EventTypesResponse = { eventTypes: EventTypeFromDB[] }
	type SingleEventTypeResponse = { eventType: EventTypeFromDB }
	type AddEventTypeResponse = {
		_id: string
		createdAt: Date
		updatedAt: Date
		createdBy: AdminSocialData
	}
	type EventCategoriesResponse = { eventCategories: EventCategoryFromDB[] }
	type SingleEventCategoryResponse = { eventCategory: EventCategoryFromDB }

	interface EventTypeFromDB extends IDInterface, TimestampsInterface {
		eventTypeName: string
		description: string
		categories: {
			categoryId: string
			eventCategoryName: string
			description: string
		}[]
		createdBy: AdminSocialData
	}

	interface EventCategoryFromDB extends IDInterface, TimestampsInterface {
		eventCategoryName: string
		description: string
		createdBy: AdminSocialData
	}

	// Users:
	type UsersResponse = { users: UserFromDB[] }
	type SingleUserResponse = { user: UserFromDB }

	interface UserFromDB extends TimestampsInterface, IDInterface {
		firstName: string
		lastName?: string
		email?: string
		phoneNumber?: string
		friends: SocialDataWithTimestamp[]
		username?: string
		loginHistory: LoginHistory[]
	}
}

export {}
