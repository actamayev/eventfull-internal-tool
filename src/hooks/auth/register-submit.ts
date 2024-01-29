import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { isNonSuccessResponse } from "src/utils/type-checks"
import AppContext from "../../contexts/eventfull-it"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useRegisterSubmit (): (
	e: React.FormEvent<HTMLFormElement>,
	registerInformationObject: RegisterCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void,
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const registerSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		registerInformationObject: RegisterCredentials,
		setError: (error: string) => void,
		setLoading: (loading: boolean) => void,
	): Promise<void> => {
		e.preventDefault()
		setError("")
		if (registerInformationObject.password !== registerInformationObject.passwordConfirmation) {
			setError("Passwords do not match")
			return
		}

		try {
			setLoading(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...registerInfo } = registerInformationObject
			const response = await appContext.eventfullApiClient.authDataService.register(registerInfo)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload and try again.")
				return
			}
			appContext.setDataAfterRegister(response.data.accessToken, registerInfo)
			navigate("/dashboard")
		} catch (error: unknown) {
			console.log(error)
			setErrorAxiosResponse(error, setError, "Unable to register")
		}
		setLoading(false)
	}

	return registerSubmit
}
