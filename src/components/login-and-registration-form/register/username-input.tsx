import FormGroup from "../../form-group"

interface Props {
	credentials: RegisterCredentials,
	setCredentials: (credentials: RegisterCredentials) => void,
}

export default function UsernameInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			id = "username"
			label = "Username"
			type = "username"
			placeholder = "tigerKing123"
			onChange = {(event) => setCredentials({...credentials, username: event.target.value})}
			required
			value = {credentials.username || ""}
		/>
	)
}
