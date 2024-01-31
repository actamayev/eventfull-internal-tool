declare global {
	interface LoginCredentials {
		contact: string
		password: string
	}

	interface OTPCredentials {
		email: string
		otp: string
	}

	interface InitialAdminRegisterInformation {
		email: string
		firstName: string
		lastName: string
	}

	interface SecondaryAdminRegisterInformationWithoutConfirmation {
		username: string
		password: string
	}

	interface SecondaryAdminRegisterInformation extends SecondaryAdminRegisterInformationWithoutConfirmation {
		passwordConfirmation: string
	}
}

export {}
