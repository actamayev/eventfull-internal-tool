import FormGroup from "../../form-group"

interface Props {
	credentials: InitialAdminRegisterInformation,
	setCredentials: (credentials: InitialAdminRegisterInformation) => void,
}

export default function FirstNameInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			id = "first-name"
			label = "First Name"
			type = "name"
			placeholder = "Mike"
			onChange = {(event) => setCredentials({...credentials, firstName: event.target.value})}
			required
			value = {credentials.firstName || ""}
		/>
	)
}
