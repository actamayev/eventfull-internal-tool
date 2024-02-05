import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import useLoginSubmit from "../hooks/auth/login-submit"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import PasswordInput from "../components/login-and-registration-form/password-input"
import ContactInput from "../components/login-and-registration-form/login/contact-input"
import ShowOrHidePasswordButton from "../components/login-and-registration-form/show-or-hide-password-button"

function Login() {
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] =
		useState<LoginCredentials>({
			contact: "",
			password: ""
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const isShowPassword = () => {
		if (showPassword) return "text"
		return "password"
	}

	const loginSubmit = useLoginSubmit(loginInformation, setError, setLoading)

	const setLoginInformationGeneric = (newCredentials: Partial<LoginCredentials>) => {
		setLoginInformation(prev => ({ ...prev, ...newCredentials }))
	}

	return (
		<AuthTemplate title="Login">
			<form onSubmit={loginSubmit}>
				<ContactInput
					credentials={loginInformation}
					setCredentials={setLoginInformation}
				/>

				<PasswordInput
					credentials = {loginInformation}
					setCredentials = {setLoginInformationGeneric}
					showPassword = {isShowPassword()}
				/>

				<ShowOrHidePasswordButton
					showPassword = {showPassword}
					setShowPassword = {setShowPassword}
				/>

				<ErrorMessage error={error} />

				<Button
					className = "mt-3 w-full font-bold text-lg text-white"
					colorClass = "bg-blue-600"
					hoverClass = "hover:bg-blue-700"
					disabled = {loading}
					title = "Login"
				/>
			</form>
		</AuthTemplate>
	)
}

export default observer(Login)
