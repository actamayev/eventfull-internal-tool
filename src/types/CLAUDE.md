# Types Directory

This directory contains TypeScript type definitions and interfaces used throughout the application. All types are declared in the global namespace for application-wide access.

## File Overview

### Auth Types (auth.d.ts)

Global interfaces for authentication flows:
- `LoginCredentials` - Username/contact and password for login
- `OTPCredentials` - Email and OTP for OTP-based login
- `InitialAdminRegisterInformation` - First admin registration (email, firstName, lastName)
- `SecondaryAdminRegisterInformation` - Subsequent admin registration with password confirmation

### Events Types (events.d.ts)

**Enums & Types:**
- `EventFrequency` - "one-time" | "custom" | "ongoing"
- `DayOfWeek` - Days of the week for recurring events

**Core Interfaces:**
- `BaseEventTime` - startTime, endTime, and optional duration
- `OngoingEvents` - Extends BaseEventTime with dayOfWeek for recurring events
- `CreatingEvent` - Full event creation form payload
- `ImageURLs` - Image metadata and active status
- `EventfullInvitee` - User invited to event with attendance status
- `EventfullAttendee` - User attending event with optional review
- `EventfullCoHost` - Co-host information
- `CreatingEventCategory` - Event category creation
- `CreatingEventType` - Event type creation with associated categories

### Response Types (response-types.ts)

**Common Responses:**
- `SuccessResponse`, `MessageResponse`, `ErrorResponse`, `ValidationErrorResponse` - HTTP response wrappers

**Auth Responses:**
- `LoginSuccess` - Personal info + access token
- `OTPLoginPersonalInfo` - Token and user info for OTP login
- `AccessTokenResponse` - Just the token
- `PersonalInfoResponse` - User personal info

**Event Responses:**
- `EventsResponse` - List of events
- `SingleEventResponse` - Single event
- `NewEventResponse` / `UpdatedEventResponse` - Event with presigned image URLs
- `EventTypesResponse`, `EventCategoriesResponse` - Collections

**Database Models:**
- `EventFromDB` - Complete event from database with all relations
- `EventTypeFromDB` - Event type with categories and creator info
- `EventCategoryFromDB` - Event category with creator info
- `UserFromDB` - User profile with login history and friends

**Users Responses:**
- `UsersResponse`, `SingleUserResponse` - User collections and single user

### Grid Data Types (grid-data.d.ts)

Data transfer objects for table/grid display:
- `EventGridRowData` - Flattened event for grid display
- `UserGridRowData` - Flattened user for grid display
- `EventCategoriesGridRowData` - Event category for grid display
- `EventTypesGridRowData` - Event type for grid display

### Utility Types (utils.d.ts)

Reusable base interfaces:
- `TimestampsInterface` - createdAt, updatedAt
- `IDInterface` - MongoDB _id
- `SocialData` - userId, username pair
- `SocialDataWithTimestamp` - SocialData + createdAt
- `AdminSocialData` - Admin identifier with username
- `LoginHistory` - Timestamp of login

### Enums (day-of-week-enum.ts)

- `DayOfWeekEnum` - Exported enum for day of week values

## Key Patterns

- All types use `declare global` for application-wide access
- Database models (`FromDB`) extend utility interfaces (TimestampsInterface, IDInterface)
- Event creation uses optional fields for different frequency types
- Response types wrap actual data with metadata (success, error messages)
- Grid data types are flattened versions of DB models for UI rendering
