import React, { useState } from "react"
import Button from "../button"
import ConfirmPassword from "./confirm-password"
import NeedNewAccountLink from "./need-new-account-link"
import SubRegisterInformation from "./sub-register-information"
import ContactInput from "./contact-input"
import PasswordInput from "./password-input"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"

interface Props {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
	credentials: AuthCredentials,
	setCredentials: (credentials: AuthCredentials) => void,
	passwordConfirm?: string,
	setPasswordConfirm?: (passwordConfirm: string) => void,
	error: string,
	loginOrSignUp: "Login" | "Sign up",
	loading: boolean,
}

export default function LoginAndRegistrationForm(props: Props) {
	const {
		handleSubmit,
		credentials,
		setCredentials,
		passwordConfirm,
		setPasswordConfirm,
		error,
		loginOrSignUp,
		loading,
	} = props

	const [showPassword, setShowPassword] = useState(false)

	const isShowPassword = () => {
		if (showPassword) return "text"
		return "password"
	}

	function ErrorMessage () {
		if (!error) return null
		return (
			<div
				className = "mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
			>
				{error}
			</div>
		)
	}

	return (
		<div className = "flex justify-center">
			<div className = "mt-5 bg-white border shadow rounded-lg p-6 w-7/12 mx-auto">
				<h1
					className = "flex justify-center mx-auto mb-4 text-5xl font-extrabold \
						leading-none tracking-tight text-gray-900"
				>
					{loginOrSignUp}
				</h1>
				<form>
					<ContactInput
						credentials = {credentials}
						setCredentials = {setCredentials}
					/>

					<PasswordInput
						credentials = {credentials}
						setCredentials = {setCredentials}
						showPassword = {isShowPassword()}
					/>

					<ConfirmPassword
						loginOrSignUp = {loginOrSignUp}
						passwordConfirm = {passwordConfirm}
						setPasswordConfirm = {setPasswordConfirm}
						showPassword = {isShowPassword()}
					/>

					<ShowOrHidePasswordButton
						showPassword= {showPassword}
						setShowPassword= {setShowPassword}
					/>

					<ErrorMessage />

					<Button
						className = "mt-3 w-full font-bold text-lg"
						colorClass = "bg-green-600"
						hoverClass = "hover:bg-green-700"
						disabled = {loading}
						title = {loginOrSignUp}
						textColor = "text-white"
						onClick = {handleSubmit}
					/>

				</form>

				<NeedNewAccountLink loginOrSignUp = {loginOrSignUp}	/>

				<SubRegisterInformation loginOrSignUp = {loginOrSignUp} />

			</div>
		</div>

	)
}
