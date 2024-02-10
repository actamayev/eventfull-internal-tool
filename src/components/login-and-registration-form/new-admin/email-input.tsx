import FormGroup from "../../form-group"

interface Props {
	credentials: InitialAdminRegisterInformation | OTPCredentials,
	setCredentials: (credentials: InitialAdminRegisterInformation | OTPCredentials) => void,
}

export default function EmailInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			label = "Email"
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({...credentials, email: event.target.value})}
			required
			value = {credentials.email || ""}
		/>
	)
}
