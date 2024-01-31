import FormGroup from "../form-group"

interface Props {
	credentials: LoginCredentials | SecondaryAdminRegisterInformation,
    setCredentials: (newCredentials: Partial<LoginCredentials | SecondaryAdminRegisterInformation>) => void;
	showPassword: "text" | "password"
}

export default function PasswordInput (props: Props) {
	const { credentials, setCredentials, showPassword } = props

	return (
		<FormGroup
			id = "password"
			label = "Password"
			type = {showPassword}
			placeholder = "Password"
			onChange={(event) => setCredentials({ password: event.target.value })}
			required
			value = {credentials.password || ""}
		/>
	)
}
