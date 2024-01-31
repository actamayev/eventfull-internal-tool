import _ from "lodash"
import validator from "validator"

export default function confirmAddAdminFields(credentials: InitialAdminRegisterInformation, setError: (error: string) => void): boolean {
	if (_.isEmpty(credentials.email)) {
		setError("Please enter an Email")
		return false
	} else if (_.isEmpty(credentials.firstName)) {
		setError("Please enter your first name")
		return false
	} else if (_.isEmpty(credentials.lastName)) {
		setError("Please enter your first name")
		return false
	} else if (validator.isEmail(credentials.email) === false) {
		setError("Please enter a valid email")
		return false
	} else {
		setError("")
		return true
	}
}
