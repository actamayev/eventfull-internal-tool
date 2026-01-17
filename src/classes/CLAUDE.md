# Classes Directory

This directory contains core MobX observable classes used for state management throughout the application.

## File Overview

### State Management Classes

- **auth-class.ts** - Manages authentication state (access token) with MobX observables. Handles token storage and retrieval from localStorage.

- **events-class.ts** - Manages events state including events, event types, and event categories. Uses Maps for efficient lookups by ID. Provides CRUD actions for all three entities.

- **users-class.ts** - Manages users state. Stores users in a Map keyed by user ID.

### API Client Classes

- **eventfull-it-api-client.ts** - Main API client facade that orchestrates HTTP client and all data services (auth, personal, events, users).

- **eventfull-it-http-client.ts** - Low-level HTTP client for making requests to the API.

- **personal-info-class.ts** - Manages personal information state.

## Key Patterns

- All observable classes use MobX's `makeObservable()` or `makeAutoObservable()` for reactivity
- State is stored using Maps for O(1) lookups
- Actions are marked with `@action` decorator for MobX
- Data is validated before adding to prevent duplicates (e.g., checking `has()` before `set()`)
