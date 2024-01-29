import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { isNonSuccessResponse } from "src/utils/type-checks"
import AppContext from "../../contexts/eventfull-it-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import confirmRegisterFields from "../../utils/auth/confirm-register-fields"

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
		try {
			const areCredentialsValid = confirmRegisterFields(registerInformationObject, setError)
			if (areCredentialsValid === false) return

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
			setErrorAxiosResponse(error, setError, "Unable to register")
		}
		setLoading(false)
	}

	return registerSubmit
}
