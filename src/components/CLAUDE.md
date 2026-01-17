# Components Directory

This directory contains reusable React components organized by feature. Components are composed hierarchically to build complete pages.

## Core Components (Root Level)

**Layout & Structure:**
- **layout.tsx** - Main app layout wrapper with navigation and routing
- **vertical-nav.tsx** - Vertical navigation sidebar

**Reusable UI:**
- **button.tsx** - Customizable button component with color and hover states. Disables on form submission or explicit disabled prop.
- **card-template.tsx** - Page container with title and white card styling
- **form-group.tsx** - Form field wrapper with consistent spacing
- **character-limit.tsx** - Text input with character counter

**Utilities:**
- **custom-link.tsx** - Custom link wrapper
- **image-uploader.tsx** - Image file upload handler with preview
- **delete-button-renderer.tsx** - Ag-Grid cell renderer for delete buttons
- **edit-button-renderer.tsx** - Ag-Grid cell renderer for edit buttons

## Feature-Based Components

### Authentication (login-and-registration-form/)

**Layout:**
- **auth-template.tsx** - Template wrapper for auth pages (login, registration)

**Shared Inputs:**
- **password-input.tsx** - Password field with visibility toggle
- **show-or-hide-password-button.tsx** - Button to toggle password visibility
- **error-message.tsx** - Error display component
- **success-message.tsx** - Success notification component

**Login (login/):**
- **contact-input.tsx** - Email/username input field

**OTP Login:**
- **otp-input.tsx** - OTP code input field

**New Admin (new-admin/):**
- **email-input.tsx** - Email field for admin creation
- **first-name-input.tsx** - First name field
- **last-name-input.tsx** - Last name field
- **username-input.tsx** - Username field for admin setup
- **confirm-password.tsx** - Password confirmation field

### Event Management (add-or-edit-event/)

Form fields and controls for event creation/editing:

**Basic Info:**
- **event-name-input.tsx** - Event title input
- **description-input.tsx** - Event description textarea
- **event-price-input.tsx** - Price field
- **event-url-input.tsx** - Virtual event URL input
- **address-input.tsx** - Physical address input (Google Maps integration)

**Event Settings:**
- **choose-event-type.tsx** - Dropdown to select event type
- **choose-event-frequency.tsx** - Selector for one-time/custom/ongoing
- **choose-extra-event-categories.tsx** - Multi-select for event categories
- **is-event-virtual.tsx** - Toggle for virtual event flag
- **is-event-public.tsx** - Toggle for public/private event

**Date/Time:**
- **select-times.tsx** - Master time selector (routes to frequency-specific selectors)
- **choose-one-time-event.tsx** - Single date/time picker
- **custom-event-date-selector.tsx** - Multiple date selector for custom events
- **ongoing-day-time-selector.tsx** - Day of week + time selector for recurring events

**Images:**
- **event-picture.tsx** - Single event picture display
- **show-pictures.tsx** - Gallery of event images

**Misc:**
- **fill-in-previous-event-button.tsx** - Button to auto-populate from last event

### Event Types (add-event-type/)

- **event-type-input.tsx** - Event type name input
- **event-type-description-input.tsx** - Event type description
- **select-event-categories.tsx** - Category selection for event type

### Event Categories (add-event-category/)

- **event-category-name-input.tsx** - Category name input
- **event-category-description-input.tsx** - Category description

### Dashboard Grids

**Events:**
- **events-dashboard/events-grid.tsx** - Ag-Grid for events list with search, sorting, delete, edit, and double-click navigation

**Event Types:**
- **event-types-dashboard/event-types-grid.tsx** - Ag-Grid for event types with CRUD operations

**Event Categories:**
- **event-categories-dashboard/event-categories-grid.tsx** - Ag-Grid for event categories with CRUD operations

**Users:**
- **users-dashboard/users-grid.tsx** - Ag-Grid for users list with view details navigation

## Component Patterns

**Props Pattern:**
- Most components receive `Props` interface with data and setter callbacks
- Generic setter pattern: `setEventDetails(partial)` allows flexible state updates

**Grid Components:**
- Use ag-grid for data tables with built-in sorting, filtering, pagination
- MobX `autorun()` watches observable state and updates grid
- Custom cell renderers for delete/edit buttons
- Row double-click navigates to edit view
- Context passed to grid for navigation paths and delete handlers

**Form Components:**
- Input components are controlled (props-driven)
- Typically styled with Tailwind classes
- Validation logic external (in hooks/utils)
- Error messages displayed below inputs

**MobX Integration:**
- Grid components wrapped with `observer()` for reactive updates
- Uses `toJS()` to convert observables to plain objects for ag-grid
- `autorun()` for automatic re-renders when state changes

**Accessibility:**
- Semantic HTML (form, input, select, button tags)
- Tailwind classes for consistent styling
- Focus states defined for interactive elements

## File Organization Strategy

- Root-level reusable UI components
- Feature-based subdirectories for related components
- Subdirectories named after features (e.g., add-or-edit-event, login-and-registration-form)
- Grid components kept in dashboard subdirectories
