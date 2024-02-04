import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import useOTPLoginSubmit from "../hooks/auth/otp-login-submit"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import OTPInput from "../components/login-and-registration-form/login/otp-input"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import EmailInput from "../components/login-and-registration-form/new-admin/email-input"

function OTPLogin() {
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] =
		useState<OTPCredentials>({
			email: "",
			otp: ""
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const otpLoginSubmit = useOTPLoginSubmit(loginInformation, setError, setLoading)

	const setLoginInformationGeneric = (newCredentials: Partial<OTPCredentials>) => {
		setLoginInformation(prev => ({ ...prev, ...newCredentials }))
	}

	return (
		<AuthTemplate title="Login with One-Time Passcode">
			<form onSubmit={otpLoginSubmit}>
				<EmailInput
					credentials={loginInformation}
					setCredentials={setLoginInformationGeneric}
				/>

				<OTPInput
					credentials = {loginInformation}
					setCredentials = {setLoginInformationGeneric}
				/>

				<ErrorMessage error={error} />

				<Button
					className = "mt-3 w-full font-bold text-lg"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					disabled = {loading}
					title = "Login"
					textColor = "text-white"
				/>
			</form>
		</AuthTemplate>
	)
}

export default observer(OTPLogin)
