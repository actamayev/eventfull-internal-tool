import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useSecondaryAdminInfoSubmit from "../hooks/auth/secondary-admin-info-submit"
import PasswordInput from "../components/login-and-registration-form/password-input"
import UsernameInput from "../components/login-and-registration-form/register/username-input"
import ConfirmPassword from "../components/login-and-registration-form/register/confirm-password"
import ShowOrHidePasswordButton from "../components/login-and-registration-form/show-or-hide-password-button"

function FinishAdminRegistration() {
	useRedirectUnknownUser()
	const [registerInformation, setRegisterInformation] =
		useState<SecondaryAdminRegisterInformation>({
			username: "",
			password: "",
			passwordConfirmation: "",
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(true)

	const isShowPassword = () => {
		if (showPassword) return "text"
		return "password"
	}

	const secondaryAdminSubmit = useSecondaryAdminInfoSubmit()

	const setRegisterInformationGeneric = (newCredentials: Partial<SecondaryAdminRegisterInformation>) => {
		setRegisterInformation(prev => ({ ...prev, ...newCredentials }))
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		await secondaryAdminSubmit(e, registerInformation, setError, setLoading)
	}

	// TODO: make sure the username is not taken (make a request to the server while the user is typing).
	return (
		<AuthTemplate title="Finish Admin Registration">
			<form onSubmit={handleFormSubmit}>
				<div className="flex">
					<div className="w-1/3 ml-4">

						<UsernameInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
						/>
					</div>
					<div className="w-1/3 mx-4">

						<PasswordInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformationGeneric}
							showPassword = {isShowPassword()}
						/>
					</div>
					<div className="w-1/2 mr-4">

						<ConfirmPassword
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
							showPassword = {isShowPassword()}
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
					title = "Register"
					textColor = "text-white"
				/>
			</form>

		</AuthTemplate>
	)
}

export default observer(FinishAdminRegistration)
