# Pages Directory

This directory contains top-level page components that serve as route handlers. Each page represents a distinct view in the application and is wrapped with the `observer` HOC for MobX reactivity.

## File Overview

### Dashboard Pages

**Events Management:**
- `events-dashboard.tsx` - Main events listing page with grid display. Fetches all events on load and requires authentication.
- `event-types-dashboard.tsx` - Lists all event types in a grid format.
- `event-categories-dashboard.tsx` - Lists all event categories in a grid format.

**User Management:**
- `users-dashboard.tsx` - Lists all users in a grid format.
- `view-user.tsx` - Detailed view of a single user. Uses route params to fetch user by ID. Displays profile info, friends list, and login history.

### CRUD Pages

**Events:**
- `add-event.tsx` - Complex form for creating new events. Integrates Google Maps API for address selection. Handles multiple event frequency types (one-time, custom, ongoing) with dynamic time selection. Includes image uploader and form validation.
- `edit-event.tsx` - Similar to add-event but for updating existing events. Prepopulates form with current event data.

**Event Types:**
- `add-event-type.tsx` - Form for creating new event types with associated categories.
- `edit-event-type.tsx` - Form for updating existing event types.

**Event Categories:**
- `add-event-category.tsx` - Form for creating new event categories.
- `edit-event-category.tsx` - Form for updating existing event categories.

**Admin:**
- `add-admin.tsx` - Form for the initial admin registration step.

### Auth Pages (auth/ subdirectory)

- `login.tsx` - Standard login form with contact/username and password fields. Includes password visibility toggle.
- `otp-login.tsx` - OTP-based login flow with email and code input.
- `finish-admin-registration.tsx` - Second step of admin registration where admins set username and password.

### Error Page

- `missing.tsx` - 404 page displayed for undefined routes.

## Key Patterns

- All pages are wrapped with `observer()` for MobX reactivity
- Pages use custom hooks (e.g., `useRedirectUnknownUser`, `useRetrieveEvents`) for common logic
- Authentication check: Pages verify `accessToken` and `personalData` are set before rendering
- Null return guards prevent rendering unauthenticated content
- State management via React `useState` with MobX observable context
- Form pages use `setEventDetailsGeneric` callback pattern for flexible state updates
- Pages that fetch data use hooks to trigger API calls on mount
- Google Maps integration for location-based forms
