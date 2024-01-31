import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { isNonSuccessResponse } from "src/utils/type-checks"
import AppContext from "../../contexts/eventfull-it-context"
import confirmRegisterFields from "../../utils/auth/confirm-secondary-register-fields"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useSecondaryAdminInfoSubmit (): (
	e: React.FormEvent<HTMLFormElement>,
	secondaryRegisterInformation: SecondaryAdminRegisterInformation,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void,
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const secondaryAdminInfoSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		secondaryRegisterInformation: SecondaryAdminRegisterInformation,
		setError: (error: string) => void,
		setLoading: (loading: boolean) => void,
	): Promise<void> => {
		e.preventDefault()
		setError("")
		try {
			const areCredentialsValid = confirmRegisterFields(secondaryRegisterInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { passwordConfirmation, ...registerInfo } = secondaryRegisterInformation
			const response = await appContext.eventfullApiClient.authDataService.finishAdminRegistration(registerInfo)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to register. Please reload and try again.")
				return
			}
			appContext.setUsername(secondaryRegisterInformation.username)
			navigate("/dashboard")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to register")
		}
		setLoading(false)
	}

	return secondaryAdminInfoSubmit
}
