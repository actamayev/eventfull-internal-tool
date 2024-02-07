import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { isNonSuccessResponse } from "src/utils/type-checks"
import AppContext from "../../contexts/eventfull-it-context"
import confirmLoginFields from "../../utils/auth/confirm-login-fields"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useLoginSubmit (
	loginInformation: LoginCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const loginSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			const response = await appContext.eventfullApiClient.authDataService.login(loginInformation)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to login. Please reload and try again.")
				return
			}
			appContext.setDataAfterLogin(response.data.accessToken, response.data)
			navigate("/event-dashboard")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to login")
		} finally {
			setLoading(false)
		}
	}

	return loginSubmit
}
