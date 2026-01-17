# Utils Directory

This directory contains reusable utility functions organized by domain. These are pure functions that provide common operations across the application.

## Directory Structure

### Root Utilities

- **format-readable-date.ts** - Formats Date objects to "M/D/YY [at] h:mmA" format using dayjs
- **comparators.ts** - Sorting comparators:
  - `dateComparator` - Compares date strings in custom format
  - `caseInsensitiveComparator` - Case-insensitive string comparison with null handling
- **type-checks.ts** - Type guard functions for API responses:
  - `isErrorResponse` - Checks for `error` property
  - `isValidationErrorResponse` - Checks for `validationError` property
  - `isMessageResponse` - Checks for `message` property
  - `isNonSuccessResponse` - Union of error/validation/message responses
  - `isErrorResponses` - Union of error/validation responses
- **calculate-button-width.ts** - Helper for dynamic button sizing
- **upload-file-to-aws.ts** - AWS S3 file upload functionality

### Auth Utils (auth/)

Validation functions for authentication forms:
- **confirm-login-fields.ts** - Validates login credentials (contact, password length/presence)
- **confirm-otp-fields.ts** - Validates OTP login credentials
- **confirm-add-admin-fields.ts** - Validates initial admin creation data
- **confirm-secondary-register-fields.ts** - Validates secondary admin registration (username, password confirmation)

### Events Utils (events/)

Event-specific operations:
- **is-add-or-save-event-disabled.ts** - Form validation:
  - `isAddOrSaveEventDisabled` - Checks all required event fields
  - `frequencyCheck` - Validates time-based fields per frequency type
  - `checkIfImagesInEditEvent` - Ensures at least one image exists in edit mode
- **is-edit-event-changed.ts** - Detects if event was modified
- **create-events-array-for-grid.ts** - Transforms EventFromDB array into flattened grid data
- **events-dashboard-colums.ts** - Column definitions for events grid table
- **calculate-event-duration.ts** - Calculates event duration from start/end times
- **handle-checkbox-change.ts** - Checkbox state change handler
- **upload-image-loop.ts** - Batch image upload logic

**time-change/ subdirectory:**
- **handle-start-date-time-change.ts** - Updates event time when start time changes
- **handle-time-change-ongoing-event.ts** - Updates recurring event times

### Event Types Utils (event-types/)

Event type operations:
- **determine-if-event-types-equal.ts** - Compares two event types for equality
- **create-event-types-array-for-grid.ts** - Transforms EventTypeFromDB array into grid data
- **event-types-dashboard-columns.ts** - Column definitions for event types grid

### Event Categories Utils (event-categories/)

Event category operations:
- **create-event-categories-array-for-grid.ts** - Transforms EventCategoryFromDB array into grid data
- **event-categories-dashboard-columns.ts** - Column definitions for event categories grid

### Users Utils (users/)

User-related operations:
- **create-users-array-for-grid.ts** - Transforms UserFromDB array into flattened grid data
- **users-dashboard-columns.ts** - Column definitions for users grid table

### Error Handling Utils (error-handling/)

- **set-error-axios-response.ts** - Extracts error message from Axios response using type guards

## Key Patterns

- **Pure functions** - No side effects, easy to test and compose
- **Type guards** - Runtime type checking with TypeScript type narrowing
- **Domain organization** - Utils grouped by business domain
- **Grid data transformation** - Functions convert database models to flattened UI data structures
- **Form validation** - Centralized validation logic for all forms
- **Column definitions** - Reusable table column configurations
