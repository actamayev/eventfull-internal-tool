import _ from "lodash"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import Button from "../components/button"
import AppContext from "../contexts/eventfull-it-context"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useSecondaryAdminInfoSubmit from "../hooks/auth/secondary-admin-info-submit"
import PasswordInput from "../components/login-and-registration-form/password-input"
import UsernameInput from "../components/login-and-registration-form/new-admin/username-input"
import ConfirmPassword from "../components/login-and-registration-form/new-admin/confirm-password"
import ShowOrHidePasswordButton from "../components/login-and-registration-form/show-or-hide-password-button"

function FinishAdminRegistration() {
	useRedirectUnknownUser()
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const [registerInformation, setRegisterInformation] = useState<SecondaryAdminRegisterInformation>({
		username: "",
		password: "",
		passwordConfirmation: "",
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	useEffect(() => {
		if (!_.isNil(appContext.personalData?.username)) {
			navigate("/event-dashboard")
		}
	}, [])

	const isShowPassword = () => {
		if (showPassword) return "text"
		return "password"
	}

	const secondaryAdminSubmit = useSecondaryAdminInfoSubmit(registerInformation, setError, setLoading)

	const setRegisterInformationGeneric = (newCredentials: Partial<SecondaryAdminRegisterInformation>) => {
		setRegisterInformation(prev => ({ ...prev, ...newCredentials }))
	}

	return (
		<AuthTemplate title="Finish Admin Registration">
			<form onSubmit={secondaryAdminSubmit}>
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
					className = "mt-3 w-full font-bold text-lg text-white"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					disabled = {loading}
					title = "Register"
				/>
			</form>

		</AuthTemplate>
	)
}

export default observer(FinishAdminRegistration)
