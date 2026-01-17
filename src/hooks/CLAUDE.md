# Hooks Directory

This directory contains custom React hooks that encapsulate logic for authentication, data fetching, form submission, and navigation. Hooks are organized by domain.

## Directory Structure

### Root Hooks

- **retrieve-personal-info.ts** - Hook to fetch and store user personal information on component mount
- **set-grid-height.ts** - Hook for managing dynamic grid container height

### Auth Hooks (auth/)

Form submission handlers for authentication flows:
- **login-submit.ts** - Form handler for login:
  - Validates credentials via `confirmLoginFields`
  - Calls `authDataService.login()`
  - Sets access token and personal data on success
  - Navigates to `/events-dashboard`

- **otp-login-submit.ts** - Form handler for OTP login with email and code
- **add-admin-submit.ts** - Form handler for initial admin registration
- **secondary-admin-info-submit.ts** - Form handler to complete admin registration with username/password

### Events Hooks (events/)

#### Retrieve (retrieve/)

Data fetching hooks that run on mount:
- **retrieve-events.ts** - Fetches all events and populates `eventsData.eventsMap`. Skips if already populated or user not authenticated.
- **retrieve-event-types.ts** - Fetches event types and populates `eventsData.eventTypes`
- **retrieve-event-categories.ts** - Fetches event categories and populates `eventsData.eventCategories`

#### Set (set/)

Hooks that fetch and populate a single entity with callback:
- **set-single-event.ts** - Fetches a single event by ID:
  - Returns `EventFromDB` or null
  - Checks context cache first, fetches if not found
  - Calls provided `setEventDetails` callback with event data

- **set-single-event-type.ts** - Fetches single event type
- **set-single-event-category.ts** - Fetches single event category

#### Add (add/)

Form submission handlers for creating new entities:
- **add-event.ts** - Creates new event:
  - Uploads images to AWS
  - Calls `eventsDataService.addEvent()`
  - Updates local events cache
  - Navigates to events dashboard

- **add-event-type.ts** - Creates new event type
- **add-event-category.ts** - Creates new event category

#### Edit (edit/)

Form submission handlers for updating entities:
- **edit-event.ts** - Updates existing event:
  - Validates no changes if form unchanged
  - Handles image uploads
  - Calls `eventsDataService.editEvent()`
  - Updates local cache

- **edit-event-type.ts** - Updates existing event type
- **edit-event-category.ts** - Updates existing event category

#### Is Button Disabled (is-button-disabled/)

Hooks that return boolean for form button disabled state:
- **is-new-event-category-disabled.ts** - Validates new category form
- **is-new-event-type-disabled.ts** - Validates new event type form
- **is-update-event-category-disabled.ts** - Validates category edit form
- **is-update-event-type-disabled.ts** - Validates event type edit form

### User Hooks (users/)

- **retrieve-users.ts** - Fetches all users on mount, skips if already loaded
- **set-single-user.ts** - Fetches single user by ID:
  - Returns `UserFromDB` or null
  - Checks context cache first
  - Calls provided `setEventDetails` callback

### Redirect Hooks (redirects/)

Navigation guards that run on component mount:
- **redirect-unknown-user.ts** - Protects authenticated pages:
  - Redirects to login if no access token
  - Redirects to admin registration if username not set
  - Fetches personal data if not already loaded

- **redirect-known-user.ts** - Redirects logged-in users away from auth pages to dashboard

## Key Patterns

- **Form handlers** return async callback functions that prevent default form submission
- **Data fetching hooks** use `useEffect` with dependency arrays to control when data is fetched
- **Caching strategy** - Checks if data already exists before fetching from API
- **Error handling** - Uses type guards to check response validity before processing
- **Navigation** - Uses `useNavigate` for programmatic routing post-action
- **Context access** - All hooks consume `AppContext` for API client and state management
- **Validation** - Form handlers call validation utilities before submission
- **Async/await** - All API calls use async/await with try-catch error handling
