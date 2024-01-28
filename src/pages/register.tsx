import { useState } from "react"
import { observer } from "mobx-react"
import useLoginSubmit from "../hooks/auth/login-submit"
import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"
import LoginAndRegistrationForm from "../components/login-and-registration-form/login-and-registration-form"

// TODO: Make this actually register
function Register() {
	const [loginInformation, setLoginInformation] =
		useState<AuthCredentials>({
			contact: "",
			password: ""
		})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const loginSubmit = useLoginSubmit()

	useRedirectKnownUser()

	return (
		<LoginAndRegistrationForm
			handleSubmit = {(e) => loginSubmit(e, loginInformation, setError, setLoading)}
			credentials = {loginInformation}
			setCredentials = {setLoginInformation}
			error = {error}
			loading = {loading}
			loginOrSignUp = "Sign up"
		/>
	)
}

export default observer(Register)
