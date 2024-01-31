import { useState } from "react"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import Button from "../components/button"
import OTPInput from "../components/login-and-registration-form/login/otp-input"
import useOTPLoginSubmit from "../hooks/auth/otp-login-submit"
import EmailInput from "../components/login-and-registration-form/register/email-input"

export default function OTPLogin() {
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] =
		useState<OTPCredentials>({
			email: "",
			otp: ""
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const otpLoginSubmit = useOTPLoginSubmit()

	const setLoginInformationGeneric = (newCredentials: Partial<OTPCredentials>) => {
		setLoginInformation(prev => ({ ...prev, ...newCredentials }))
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		await otpLoginSubmit(e, loginInformation, setError, setLoading)
	}

	return (
		<AuthTemplate title="Login with One-Time Passcode">
			<form onSubmit={handleFormSubmit}>
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
