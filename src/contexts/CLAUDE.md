# Contexts Directory

This directory contains the global React Context that serves as the central state management hub for the entire application.

## File Overview

### EventfullITContext (eventfull-it-context.ts)

A MobX observable context class that manages all global application state and provides access to API clients.

**Private State:**
- `_authClass` - Authentication state (access token)
- `_personalData` - Current user's personal information
- `_eventsData` - All events, event types, and event categories
- `_usersData` - All users

**Public API Client:**
- `eventfullApiClient` - Instance of EventfullITApiClient with all data services

**Getters/Setters:**
- `authClass` - Access to authentication state
- `personalData` - Access to user personal info
- `eventsData` - Access to events state
- `usersData` - Access to users state

**Core Methods:**

**Initialization & Storage:**
- `getAllDataFromStorage()` - Retrieves all persisted data from localStorage/sessionStorage on context creation
- `getAuthDataFromStorage()` - Retrieves access token from localStorage and syncs to httpClient

**Login/Authentication:**
- `setDataAfterLogin(accessToken, userInfo)` - Called after standard login:
  - Sets access token in auth class and httpClient
  - Stores personal info (firstName, lastName, email, username)
- `setDataAfterOTPLogin(userInfo)` - Called after OTP login:
  - Sets access token
  - Stores OTP login response data (email, firstName, lastName)

**User Data Management:**
- `setAllPersonalData(userInfo)` - Updates and persists user personal information
- `setUsername(username)` - Sets and stores username in sessionStorage (used during admin registration)

**Logout:**
- `logout()` - Clears all state and storage:
  - Clears localStorage and sessionStorage
  - Resets all state objects to initial/null values
  - Creates new API client instance
  - Wrapped in `runInAction()` for MobX synchronous updates

## State Hierarchy

```
EventfullITContext (Observable)
├── AuthClass (_authClass)
│   └── accessToken
├── PersonalInfoClass (_personalData)
│   ├── firstName
│   ├── lastName
│   ├── email
│   └── username
├── EventsClass (_eventsData)
│   ├── eventsMap
│   ├── eventTypes
│   └── eventCategories
├── UsersClass (_usersData)
│   └── usersMap
└── EventfullITApiClient (eventfullApiClient)
    ├── httpClient
    ├── authDataService
    ├── personalDataService
    ├── eventsDataService
    └── usersDataService
```

## Storage Strategy

- **localStorage** - Persists access token across browser sessions
- **sessionStorage** - Stores username during admin registration flow
- **Memory** - Observable state classes for reactive updates

## Key Patterns

- **MobX Observable** - All mutations trigger reactive updates in observers
- **Dependency Injection** - API client passed to all hooks via context
- **Lazy Initialization** - State objects (personalData, eventsData, usersData) created on-demand
- **Single Instance** - Context created once and shared globally
- **Centralized Login** - All auth flows converge on `setDataAfterLogin` or `setDataAfterOTPLogin`
- **Clean Logout** - Complete state reset with new instances to prevent stale data
- **Token Sync** - Access token always synced between authClass and httpClient
