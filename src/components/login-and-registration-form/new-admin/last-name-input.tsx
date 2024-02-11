import FormGroup from "../../form-group"

interface Props {
	credentials: InitialAdminRegisterInformation,
	setCredentials: (credentials: InitialAdminRegisterInformation) => void,
}

export default function LastNameInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			label = "Last Name"
			type = "name"
			placeholder = "Tyson"
			onChange = {(event) => setCredentials({...credentials, lastName: event.target.value})}
			required
			value = {credentials.lastName || ""}
		/>
	)
}
