import { useState } from "react"
import { observer } from "mobx-react"
import useLoginSubmit from "../hooks/auth/login-submit"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import ContactInput from "../components/login-and-registration-form/login/contact-input"
import PasswordInput from "../components/login-and-registration-form/password-input"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import Button from "../components/button"
import NeedNewAccountLink from "../components/login-and-registration-form/login/need-new-account-link"
import ShowOrHidePasswordButton from "../components/login-and-registration-form/show-or-hide-password-button"

function Login() {
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] =
		useState<AuthCredentials>({
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

	const loginSubmit = useLoginSubmit()


	const setLoginInformationGeneric = (newCredentials: Partial<AuthCredentials>) => {
		setLoginInformation(prev => ({ ...prev, ...newCredentials }))
	}

	return (
		<AuthTemplate loginOrSignUp="Login">
			<form>
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
					className = "mt-3 w-full font-bold text-lg"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					disabled = {loading}
					title = "Login"
					textColor = "text-white"
					onClick = {(e) => loginSubmit(e, loginInformation, setError, setLoading)}
				/>
			</form>
			<NeedNewAccountLink />
		</AuthTemplate>
	)
}

export default observer(Login)
