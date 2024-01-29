declare global {
	interface AuthCredentials {
		contact: string
		password: string
	}

	interface RegisterCredentialsWithoutConfirmation {
		email: string
		firstName: string
		lastName: string
		username: string
		password: string
	}

	interface RegisterCredentials extends RegisterCredentialsWithoutConfirmation {
		passwordConfirmation: string
	}
}

export {}
