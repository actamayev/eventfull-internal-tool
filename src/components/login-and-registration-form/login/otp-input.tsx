import FormGroup from "../../form-group"

interface Props {
	credentials: OTPCredentials
	setCredentials: (credentials: OTPCredentials) => void
}

export default function OTPInput (props: Props) {
	const { credentials, setCredentials } = props

	return (
		<FormGroup
			label = "One Time Passcode"
			type = "text"
			placeholder = "314159"
			onChange = {(event) => setCredentials({...credentials, otp: event.target.value})}
			required
			value = {credentials.otp || ""}
		/>
	)
}
