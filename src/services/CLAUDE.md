# Services Directory

This directory contains data service classes that handle all HTTP communication with the backend API. Each service is responsible for a specific domain of the application.

## File Overview

### AuthDataService (auth-data-service.ts)

Handles authentication-related API calls:

**Methods:**
- `login(loginInformation)` - POST to `/auth/login` with credentials
- `loginWithOTP(otpLoginInformation)` - POST to `/auth/otp-login` with email and OTP
- `addAdmin(initialAdminRegisterInformation)` - POST to `/auth/add-admin` to create initial admin
- `finishAdminRegistration(secondaryAdminRegisterInformation)` - POST to `/auth/finish-admin-registration` to complete admin setup
- `logout()` - POST to `/auth/logout`

### EventsDataService (events-data-service.ts)

Handles all event, event type, and event category operations. Organized into three sections:

**Events:**
- `addEvent(eventfullEventData, numberOfImages)` - POST to `/events/add-event`
- `getEvents()` - GET `/events/get-events`
- `getEventById(eventId)` - GET `/events/get-event/{eventId}`
- `editEvent(eventfullEventData, numberOfImages)` - POST to `/events/update-event`
- `addEventImages(eventId, imageURLs)` - POST to `/events/add-image-urls/{eventId}`
- `deleteEvent(eventId)` - DELETE `/events/delete-event/{eventId}`

**Event Categories:**
- `addEventCategory(eventCategoryDetails)` - POST to `/events/add-event-category`
- `retrieveEventCategories()` - GET `/events/get-event-categories`
- `getEventCategoryById(eventCategoryId)` - GET `/events/get-event-category/{eventCategoryId}`
- `editEventCategory(eventCategoryDetails)` - POST to `/events/update-event-category`
- `deleteEventCategory(eventCategoryId)` - DELETE `/events/delete-event-category/{eventCategoryId}`

**Event Types:**
- `addEventType(eventTypeDetails)` - POST to `/events/add-event-type`
- `retrieveEventTypes()` - GET `/events/get-event-types`
- `getEventTypeById(eventTypeId)` - GET `/events/get-event-type/{eventTypeId}`
- `editEventType(eventTypeDetails)` - POST to `/events/update-event-type`
- `deleteEventType(eventTypeId)` - DELETE `/events/delete-event-type/{eventTypeId}`

### PersonalDataService (personal-data-service.ts)

Handles personal information retrieval:

**Methods:**
- `retrievePersonalData()` - GET `/personal-info/retrieve-personal-data`

### UsersDataService (users-data-service.ts)

Handles user data retrieval:

**Methods:**
- `getUsersEvents()` - GET `/users/get-users`
- `getUserById(userId)` - GET `/users/get-user/{userId}`

## Key Patterns

- All services receive `EventfullITHttpClient` via dependency injection in constructor
- All methods are async and return `AxiosResponse<ResponseType | ErrorType>`
- Response types are strongly typed based on API endpoint contracts
- No business logic is performed here—services are purely API wrappers
- Services are instantiated and managed by the main `EventfullITApiClient` class
