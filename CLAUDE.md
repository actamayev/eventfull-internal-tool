# Eventfull Internal Tool - Global Architecture Guide

This is an admin dashboard for managing events, event types, event categories, and users. Built with React, TypeScript, MobX, and Tailwind CSS.

## Project Overview

**Stack:**
- React 18 + TypeScript
- MobX for global state management
- React Router v6 for navigation
- Ag-Grid for data tables
- Tailwind CSS for styling
- Axios for HTTP requests
- Google Maps API for location selection
- Material-UI date pickers

**Build System:**
- Create React App (react-scripts)
- ESLint + TypeScript type checking
- Tailwind CSS + PostCSS

## Architecture Layers

### 1. Routing (Root: index.tsx + App.tsx)

**Entry Point: index.tsx**
- Wraps app with React Router (BrowserRouter)
- Initializes StateManager for MobX context
- Wraps with Layout component
- Renders App component with all routes

**App Router: App.tsx**
- Imports and routes all page components
- Routes are organized by domain:
  - Auth: `/` (login), `/add-admin`, `/otp-login`, `/finish-admin-registration`
  - Events: `/events-dashboard`, `/add-event`, `/edit-event/:eventId`
  - Users: `/users-dashboard`, `/view-user/:userId`
  - Event Types: `/event-types-dashboard`, `/add-event-type`, `/edit-event-type/:eventTypeId`
  - Event Categories: `/event-categories-dashboard`, `/add-event-category`, `/edit-event-category/:eventCategoryId`

### 2. State Management (src/contexts/)

**AppContext: EventfullITContext**
- Single source of truth for all global state
- MobX observable for reactive updates
- Contains:
  - AuthClass (_authClass) - Access token
  - PersonalInfoClass (_personalData) - Current user info
  - EventsClass (_eventsData) - All events, types, categories
  - UsersClass (_usersData) - All users
  - EventfullITApiClient - API access
- Manages initialization from localStorage
- Handles login/logout workflows

**StateManager Provider: state-manager.tsx**
- Creates single EventfullITContext instance
- Provides context to entire app via Provider

### 3. Data Access Layer (src/services/ + src/classes/)

**Services (HTTP Layer): src/services/**
- AuthDataService - Login, OTP, admin registration, logout
- EventsDataService - CRUD for events, types, categories
- PersonalDataService - User profile retrieval
- UsersDataService - User list and details

**Observable Classes (State Layer): src/classes/**
- AuthClass - Stores access token
- EventsClass - Maps for events, event types, categories
- UsersClass - Map of users
- PersonalInfoClass - User personal information
- EventfullITApiClient - Facade orchestrating all services and HTTP client

### 4. Business Logic (src/hooks/)

**Patterns:**
- **Form Handlers** (auth/, events/add/, events/edit/) - Submit form data to API, update state, handle errors
- **Data Fetching** (events/retrieve/, users/) - Fetch data on component mount, populate observable state
- **Single Entity Setters** (events/set/, users/) - Fetch single entity by ID, call setState callback
- **Navigation Guards** (redirects/) - Protect pages (auth) or redirect (known users)
- **Button State** (events/is-button-disabled/) - Validate form state for submit buttons

**Key Hook Types:**
1. Form handlers return async callbacks for form submission
2. Data fetchers use useEffect with dependency arrays
3. Setters use useState + useEffect + API calls
4. Guards redirect based on auth state

### 5. UI Layer (src/components/ + src/pages/)

**Pages: src/pages/**
- Route handlers that compose components + hooks
- Wrapped with observer() for MobX reactivity
- Use custom hooks for all side effects
- Protected by redirect guards

**Components: src/components/**
- Reusable, composable UI building blocks
- Grid components use ag-grid for data tables
- Form components for user input
- Wrapped with observer() when they consume observable state
- Props-driven state updates

**Component Organization:**
- Root-level: Reusable UI (button, card, form inputs)
- Feature subdirectories: Domain-specific components (events, auth, types, categories)
- Dashboard subdirectories: Grid components

### 6. Utilities (src/utils/)

**Validation:**
- auth/ - Form field validation (login, OTP, admin registration)
- events/is-add-or-save-event-disabled.ts - Event form validation

**Transformations:**
- Grid data transformers (create-*-array-for-grid.ts) - Convert DB models to flat grid rows
- Column definitions - Table column configurations

**Comparators & Type Checks:**
- comparators.ts - Date and string comparisons for sorting
- type-checks.ts - Type guards for API responses

**Domain Utilities:**
- event-categories/, event-types/, events/, users/ - Domain-specific helpers
- error-handling/ - Error extraction from responses
- format-readable-date.ts, calculate-event-duration.ts - Formatting helpers

### 7. Types (src/types/)

**Global Declarations (declare global):**
- auth.d.ts - LoginCredentials, OTPCredentials, registration types
- events.d.ts - Event creation, frequency types, event relations
- response-types.ts - API response shapes, DB models (FromDB)
- grid-data.d.ts - Flattened grid row types
- utils.d.ts - Base interfaces (TimestampsInterface, IDInterface, SocialData, etc.)
- day-of-week-enum.ts - Enum for days

## Data Flow

### Authentication Flow
1. User submits login form (pages/auth/login.tsx)
2. loginSubmit hook validates fields and calls authDataService.login()
3. On success, context.setDataAfterLogin() stores token and user info
4. Navigate to /events-dashboard
5. Redirect guard verifies auth and loads personal data if needed

### Event CRUD Flow
1. User navigates to /add-event (pages/add-event.tsx)
2. Form collects data, hook useAddEvent() validates and calls eventsDataService.addEvent()
3. Service returns presigned URLs for image uploads
4. Images uploaded to AWS via uploadFileToAWS()
5. Event added to context.eventsData.eventsMap
6. Navigate to /events-dashboard
7. EventsGrid observes eventsData and auto-updates grid

### Data Fetching Flow
1. Component mounts (e.g., EventsDashboard)
2. useRetrieveEvents() hook runs in useEffect
3. Checks if data already cached in context
4. If not cached, calls eventsDataService.getEvents()
5. Populates context.eventsData.eventsMap
6. Grid component observes map and renders rows
7. Grid subscribes to real-time updates via MobX autorun()

## Storage Strategy

- **localStorage** - Access token (persisted across sessions)
- **sessionStorage** - Username (during admin registration)
- **Memory (Observables)** - All app state via MobX classes

## Key Patterns

**MobX Reactivity:**
- All state objects are observable
- Components wrapped with observer() consume observables
- Grid components use autorun() to watch for changes
- runInAction() for synchronous batch updates (logout)

**Caching:**
- Data fetchers check if already loaded before API call
- Reduces API calls on component remounts

**Error Handling:**
- Type guards (type-checks.ts) validate responses
- Service errors caught in try-catch
- setError callbacks display user-facing messages

**Validation:**
- Form validation functions in utils/auth/ and events/
- Button disabled state from is-button-disabled hooks
- Validation runs before form submission

**Navigation:**
- Redirect guards on protected pages
- Double-click grid rows to edit
- Button onClick handlers for navigation

## Security Notes

- Access token stored in localStorage
- No sensitive data in sessionStorage beyond username
- React DevTools disabled in production
- ESLint configured to catch common errors

## Development Guidelines

1. **Add a new page:**
   - Create pages/*.tsx with observer() wrapper
   - Use redirect guard if protected
   - Compose with components and hooks

2. **Add a new feature:**
   - Create hooks in hooks/ for side effects
   - Create components in components/ for UI
   - Add types in types/ for new data shapes
   - Add utils/ helpers for validation/transformation

3. **Modify state:**
   - Add methods to observable classes (classes/)
   - Update via context methods (contexts/)
   - Never modify observables directly without makeAutoObservable()

4. **Add API calls:**
   - Create service method in services/
   - Call from hook
   - Update context on success
   - Display errors via setError callback

5. **Add routes:**
   - Create page component
   - Add route in App.tsx
   - Update navigation as needed

## Debugging Tips

- Use React DevTools (disabled in prod) to inspect component tree
- MobX DevTools shows observable updates
- Check browser console for logged errors
- Inspect localStorage for persisted auth token
- Use type-checks.ts guards to validate API responses
