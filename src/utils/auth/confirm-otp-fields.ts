import _ from "lodash"
import validator from "validator"

export default function confirmOTPLoginFields(credentials: OTPCredentials, setError: (error: string) => void): boolean {
	if (_.isEmpty(credentials.email)) {
		setError("Please enter an Email")
		return false
	} else if (credentials.otp.length !== 6)  {
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
