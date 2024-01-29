import FormGroup from "../../form-group"

interface Props {
	credentials: RegisterCredentials,
	setCredentials: (credentials: RegisterCredentials) => void,
}

export default function LastNameInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			id = "last-name"
			label = "Last Name"
			type = "name"
			placeholder = "Tyson"
			onChange = {(event) => setCredentials({...credentials, lastName: event.target.value})}
			required
			value = {credentials.lastName || ""}
		/>
	)
}
