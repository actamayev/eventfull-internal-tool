import { useState } from "react"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import EmailInput from "../components/login-and-registration-form/register/email-input"
import FirstNameInput from "../components/login-and-registration-form/register/first-name-input"
import LastNameInput from "../components/login-and-registration-form/register/last-name-input"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import Button from "../components/button"
import useAddAdminSubmit from "../hooks/auth/add-admin-submit"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"

// eslint-disable-next-line max-lines-per-function
export default function AddAdmin() {
	useRedirectUnknownUser()
	const [registerInformation, setRegisterInformation] =
		useState<InitialAdminRegisterInformation>({
			email: "",
			firstName: "",
			lastName: "",
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const addAdminSubmit = useAddAdminSubmit()

	const setRegisterInformationGeneric = (newCredentials: Partial<InitialAdminRegisterInformation>) => {
		setRegisterInformation(prev => ({ ...prev, ...newCredentials }))
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		await addAdminSubmit(e, registerInformation, setError, setLoading, setRegisterInformation)
	}

	// TODO: make sure the email is not taken (make a request to the server while the user is typing).
	return (
		<AuthTemplate title="Add Admin" width="w-5/12">
			<form onSubmit={handleFormSubmit}>
				<div className="flex">
					<div className="w-1/3 ml-2">
						<EmailInput
							credentials={registerInformation}
							setCredentials={setRegisterInformationGeneric}
						/>
					</div>

					<div className="w-1/3 mx-2">

						<FirstNameInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
						/>
					</div>

					<div className="w-1/3 mr-2">

						<LastNameInput
							credentials = {registerInformation}
							setCredentials = {setRegisterInformation}
						/>
					</div>
				</div>


				<ErrorMessage error = {error} />

				<Button
					className = "mt-3 w-full font-bold text-lg"
					colorClass = "bg-green-600"
					hoverClass = "hover:bg-green-700"
					disabled = {loading}
					title = "Add Amin"
					textColor = "text-white"
				/>
			</form>

		</AuthTemplate>
	)
}
