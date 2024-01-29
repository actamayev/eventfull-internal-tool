import FormGroup from "../../form-group"
import isAuthCredentials from "../../../utils/is-login-credentials"

interface Props {
	credentials: AuthCredentials,
	setCredentials: (credentials: AuthCredentials) => void,
}

export default function ContactInput (props: Props) {
	const { credentials, setCredentials } = props

	if (isAuthCredentials(credentials) === false) return null

	return (
		<FormGroup
			id = "contact"
			label = "Username"
			type = "contact"
			placeholder = "abc@123.com"
			onChange = {(event) => setCredentials({...credentials, contact: event.target.value})}
			required
			value = {credentials.contact || ""}
		/>
	)
}
