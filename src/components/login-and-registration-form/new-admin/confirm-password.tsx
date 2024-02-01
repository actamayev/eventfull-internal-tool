import FormGroup from "../../form-group"

interface Props {
	credentials: SecondaryAdminRegisterInformation,
	setCredentials: (credentials: SecondaryAdminRegisterInformation) => void,
	showPassword: "text" | "password",
}

export default function ConfirmPassword (props: Props) {
	const { credentials, setCredentials, showPassword } = props

	return (
		<FormGroup
			id = "confirm-password"
			label = "Password Confirmation"
			type = {showPassword}
			placeholder = "Confirm Password"
			onChange = {(event) => setCredentials({...credentials, passwordConfirmation: event.target.value})}
			required
			value = {credentials.passwordConfirmation || ""}
		/>
	)
}
