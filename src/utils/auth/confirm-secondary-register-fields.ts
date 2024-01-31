import _ from "lodash"

export default function confirmSecondaryRegisterFields(
	credentials: SecondaryAdminRegisterInformation,
	setError: (error: string) => void
): boolean {
	if (_.isEmpty(credentials.password)) {
		setError("Please enter a password")
		return false
	} else if (_.isEmpty(credentials.passwordConfirmation)) {
		setError("Please confirm your password")
		return false
	} else if (_.isEmpty(credentials.username)) {
		setError("Please enter your username")
		return false
	} else if (credentials.username.length < 3) {
		setError("Username must be at least 3 characters")
		return false
	} else if (credentials.password.length < 6) {
		setError("Password must be at least 6 characters")
		return false
	} else if (!_.isEqual(credentials.password, credentials.passwordConfirmation)) {
		setError("Passwords must match")
		return false
	} else if (credentials.username.includes("@") === true) {
		setError("Username cannot contain '@'")
		return false
	} else {
		setError("")
		return true
	}
}
