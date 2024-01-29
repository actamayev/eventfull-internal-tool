import FormGroup from "../../form-group"

interface Props {
	credentials: RegisterCredentials,
	setCredentials: (credentials: RegisterCredentials) => void,
}

export default function EmailInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			id = "email"
			label = "Email"
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({...credentials, email: event.target.value})}
			required
			value = {credentials.email || ""}
		/>
	)
}
