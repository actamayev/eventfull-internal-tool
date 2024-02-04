import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import useAddAdminSubmit from "../hooks/auth/add-admin-submit"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import AuthTemplate from "../components/login-and-registration-form/auth-template"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import EmailInput from "../components/login-and-registration-form/new-admin/email-input"
import LastNameInput from "../components/login-and-registration-form/new-admin/last-name-input"
import FirstNameInput from "../components/login-and-registration-form/new-admin/first-name-input"
import SuccessMessage from "../components/login-and-registration-form/success-message"

function AddAdmin() {
	useRedirectUnknownUser()
	const [registerInformation, setRegisterInformation] =
		useState<InitialAdminRegisterInformation>({
			email: "",
			firstName: "",
			lastName: "",
		})
	const [error, setError] = useState("")
	const [success, setSuccess] = useState("")
	const [loading, setLoading] = useState(false)

	const addAdminSubmit = useAddAdminSubmit(registerInformation, setError, setLoading, setRegisterInformation, setSuccess)

	const setRegisterInformationGeneric = (newCredentials: Partial<InitialAdminRegisterInformation>) => {
		setRegisterInformation(prev => ({ ...prev, ...newCredentials }))
	}

	return (
		<AuthTemplate title="Add Admin" width="w-5/12">
			<form onSubmit={addAdminSubmit}>
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

				<SuccessMessage message = {success} />

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

export default observer(AddAdmin)
