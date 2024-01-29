import FormGroup from "../../form-group"

interface Props {
	credentials: LoginCredentials,
	setCredentials: (credentials: LoginCredentials) => void,
}

export default function ContactInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			id = "contact"
			label = "Email/Username"
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({...credentials, contact: event.target.value})}
			required
			value = {credentials.contact || ""}
		/>
	)
}
