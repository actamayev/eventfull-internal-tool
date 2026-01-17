# Eventfull Internal Tool

An admin dashboard for managing events, event types, event categories, and users. Built with React, TypeScript, MobX, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.sample`:
   ```bash
   cp .env.sample .env
   ```
   Update the following environment variables:
   - `REACT_APP_API_BASE_URL` - Backend API base URL
   - `REACT_APP_GOOGLE_API_KEY` - Google Maps API key for address selection

### Running Locally

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types
- `npm run validate` - Run lint + type-check

## Project Structure

```
src/
├── classes/          - MobX observable classes for state management
├── components/       - Reusable React components organized by feature
├── contexts/         - Global React Context for app state
├── hooks/            - Custom React hooks for side effects and logic
├── pages/            - Page components (route handlers)
├── services/         - API service classes for HTTP requests
├── styles/           - Global CSS and Tailwind configuration
├── types/            - TypeScript type definitions
├── utils/            - Utility functions organized by domain
├── App.tsx           - Router configuration
├── index.tsx         - App entry point
├── state-manager.tsx - MobX context provider
└── CLAUDE.md         - Detailed architecture documentation
```

For detailed information about each directory, see the `CLAUDE.md` file in that directory.

## Architecture Overview

### Tech Stack

- **React 18** - UI framework
- **TypeScript** - Static typing
- **MobX** - Global state management
- **React Router v6** - Client-side routing
- **Ag-Grid** - Data tables with sorting, filtering, pagination
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Material-UI Date Pickers** - Date/time selection
- **Google Maps API** - Location selection for events

### Key Features

1. **Authentication**
   - Standard login (email/username + password)
   - OTP-based login
   - Admin registration (two-step process)

2. **Event Management**
   - Create, read, update, delete events
   - Support for three event types: one-time, custom (multiple dates), ongoing (recurring)
   - Image upload to AWS S3
   - Event categories and types
   - Public/private visibility
   - Capacity management

3. **User Management**
   - View all users
   - View user details (profile, friends, login history)

4. **Data Management**
   - Manage event types and categories
   - CRUD operations for all entities
   - Data grid with search, sort, pagination

## State Management

The app uses **MobX** for global state with a centralized context pattern:

1. **EventfullITContext** - Stores all app state including auth, events, users
2. **StateManager** - Provides context to entire app
3. **Components** - Access state via `useContext(AppContext)`
4. **Observables** - Changes trigger automatic UI updates via `observer()` HOC

State persists to:
- **localStorage** - Access token (across browser sessions)
- **sessionStorage** - Username (during admin registration)

## Routing

All routes are defined in `src/App.tsx`:

### Public Routes
- `/` - Login page
- `/add-admin` - Add new admin
- `/otp-login` - OTP login
- `/finish-admin-registration` - Complete admin setup

### Protected Routes (require authentication)
- `/events-dashboard` - View all events
- `/add-event` - Create new event
- `/edit-event/:eventId` - Edit event
- `/users-dashboard` - View all users
- `/view-user/:userId` - View user details
- `/event-types-dashboard` - View event types
- `/add-event-type` - Create event type
- `/edit-event-type/:eventTypeId` - Edit event type
- `/event-categories-dashboard` - View event categories
- `/add-event-category` - Create event category
- `/edit-event-category/:eventCategoryId` - Edit event category

Protected routes use `useRedirectUnknownUser()` hook to verify authentication.

## Development Workflow

### Adding a New Page

1. Create page component in `src/pages/`
2. Use `observer()` to make it reactive
3. Add `useRedirectUnknownUser()` if authentication required
4. Compose with components and hooks
5. Add route in `src/App.tsx`

### Adding a New Feature

1. **Create types** in `src/types/` (declare global interfaces)
2. **Create service methods** in `src/services/` for API calls
3. **Create hooks** in `src/hooks/` for side effects
4. **Create components** in `src/components/` for UI
5. **Create page** in `src/pages/` to tie it together
6. **Add utility functions** in `src/utils/` for validation/transformation

### Modifying State

1. Add methods to observable classes in `src/classes/`
2. Update via context methods in `src/contexts/`
3. Call from hooks: `appContext.methodName()`
4. Components automatically re-render via MobX observables

### Adding API Endpoints

1. Create service method in appropriate file in `src/services/`
2. Create hook in `src/hooks/` to call service
3. Handle errors via `setError` callback
4. Update app state on success
5. Display errors to user

## Error Handling

- **Type guards** in `src/utils/type-checks.ts` validate API responses
- **Error messages** displayed to users via `ErrorMessage` component
- **Try-catch** blocks in all async operations
- **Axios errors** caught and formatted for display

## Code Quality

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Validation
```bash
npm run validate
```

All code must pass linting and type checking before committing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)

React DevTools disabled in production for security.

## API Integration

The app communicates with a backend API. The base URL is configured via `REACT_APP_API_BASE_URL` environment variable.

**Key Endpoints:**
- `POST /auth/login` - Standard login
- `POST /auth/otp-login` - OTP login
- `POST /auth/add-admin` - Register admin
- `GET /events/get-events` - Get all events
- `POST /events/add-event` - Create event
- `POST /events/update-event` - Update event
- `DELETE /events/delete-event/:id` - Delete event
- `GET /users/get-users` - Get all users
- And more...

See `src/services/` for complete list of available endpoints.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run validate` to check code quality
4. Commit with descriptive messages
5. Push to remote and create a pull request

## Documentation

For comprehensive architecture documentation, see [CLAUDE.md](./CLAUDE.md).

For directory-specific documentation, see the `CLAUDE.md` file in each directory:
- [src/classes/CLAUDE.md](./src/classes/CLAUDE.md)
- [src/components/CLAUDE.md](./src/components/CLAUDE.md)
- [src/contexts/CLAUDE.md](./src/contexts/CLAUDE.md)
- [src/hooks/CLAUDE.md](./src/hooks/CLAUDE.md)
- [src/pages/CLAUDE.md](./src/pages/CLAUDE.md)
- [src/services/CLAUDE.md](./src/services/CLAUDE.md)
- [src/types/CLAUDE.md](./src/types/CLAUDE.md)
- [src/utils/CLAUDE.md](./src/utils/CLAUDE.md)

## License

Private project
