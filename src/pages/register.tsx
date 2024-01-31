import { useState } from "react"
import { observer } from "mobx-react"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import EmailInput from "../components/login-and-registration-form/register/email-input"
import PasswordInput from "../components/login-and-registration-form/password-input"
import ConfirmPassword from "../components/login-and-registration-form/register/confirm-password"
import UsernameInput from "../components/login-and-registration-form/register/username-input"
import FirstNameInput from "../components/login-and-registration-form/register/first-name-input"
import LastNameInput from "../components/login-and-registration-form/register/last-name-input"
import SubRegisterInformation from "../components/login-and-registration-form/register/sub-register-information"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import Button from "../components/button"
import useRegisterSubmit from "../hooks/auth/register-submit"
import ShowOrHidePasswordButton from "../components/login-and-registration-form/show-or-hide-password-button"

// eslint-disable-next-line max-lines-per-function
function Register() {
	useRedirectKnownUser()
	const [registerInformation, setRegisterInformation] =
		useState<RegisterCredentials>({
			username: "",
			password: "",
			passwordConfirmation: "",
			email: "",
			firstName: "",
			lastName: "",
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(true)

	const isShowPassword = () => {
		if (showPassword) return "text"
		return "password"
	}

	const registerSubmit = useRegisterSubmit()

	const setRegisterInformationGeneric = (newCredentials: Partial<RegisterCredentials>) => {
		setRegisterInformation(prev => ({ ...prev, ...newCredentials }))
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		await registerSubmit(e, registerInformation, setError, setLoading)
	}

	// TODO: make sure the username is not taken (make a request to the server while the user is typing).
	// make sure the email is not taken (make a request to the server while the user is typing).
	return (
		<AuthTemplate loginOrSignUp="Sign up">
			<form onSubmit={handleFormSubmit}>
				<div className="flex">
					<div className="w-1/2">
						<EmailInput
							credentials={registerInformation}
							setCredentials={setRegisterInformation}
						/>
					</div>

					<div className="w-1/2 mx-4">

						<UsernameInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
						/>
					</div>
				</div>

				<div className="flex">
					<div className="w-1/2">

						<PasswordInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformationGeneric}
							showPassword = {isShowPassword()}
						/>
					</div>
					<div className="w-1/2 mx-4">

						<ConfirmPassword
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
							showPassword = {isShowPassword()}
						/>
					</div>

				</div>

				<div className="flex">
					<div className="w-1/2">

						<FirstNameInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
						/>
					</div>

					<div className="w-1/2 mx-4">

						<LastNameInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
						/>
					</div>

				</div>

				<ShowOrHidePasswordButton
					showPassword = {showPassword}
					setShowPassword = {setShowPassword}
				/>

				<ErrorMessage error = {error} />

				<Button
					className = "mt-3 w-full font-bold text-lg"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					disabled = {loading}
					title = "Sign up"
					textColor = "text-white"
				/>
			</form>

			<SubRegisterInformation />

		</AuthTemplate>
	)
}

export default observer(Register)
