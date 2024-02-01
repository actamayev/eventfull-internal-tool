import _ from "lodash"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { isNonSuccessResponse } from "src/utils/type-checks"
import AppContext from "../../contexts/eventfull-it-context"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"
import confirmOTPLoginFields from "../../utils/auth/confirm-otp-fields"

export default function useOTPLoginSubmit (): (
	e: React.FormEvent<HTMLFormElement>,
	loginInformation: OTPCredentials,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void,
) => Promise<void> {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	const otpLoginSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
		loginInformation: OTPCredentials,
		setError: (error: string) => void,
		setLoading: (loading: boolean) => void,
	): Promise<void> => {
		setError("")
		e.preventDefault()

		try {
			const areCredentialsValid = confirmOTPLoginFields(loginInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			const response = await appContext.eventfullApiClient.authDataService.loginWithOTP(loginInformation.email, loginInformation.otp)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to login. Please reload and try again.")
				return
			}
			appContext.setDataAfterOTPLogin(response.data)
			navigate("/finish-admin-registration")
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to login")
		} finally {
			setLoading(false)
		}
	}

	return otpLoginSubmit
}
