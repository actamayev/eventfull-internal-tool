import _ from "lodash"
import { useContext } from "react"
import { isNonSuccessResponse } from "src/utils/type-checks"
import AppContext from "../../contexts/eventfull-it-context"
import confirmAddAdminFields from "../../utils/auth/confirm-add-admin-fields"
import setErrorAxiosResponse from "../../utils/error-handling/set-error-axios-response"

export default function useAddAdminSubmit (
	initialAdminRegisterInformation: InitialAdminRegisterInformation,
	setError: (error: string) => void,
	setLoading: (loading: boolean) => void,
	setRegisterInformation: React.Dispatch<React.SetStateAction<InitialAdminRegisterInformation>>,
	setSuccess: React.Dispatch<React.SetStateAction<string>>
): (
	e: React.FormEvent<HTMLFormElement>,
) => Promise<void> {
	const appContext = useContext(AppContext)

	const addAdmin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setError("")
		setSuccess("")
		try {
			const areCredentialsValid = confirmAddAdminFields(initialAdminRegisterInformation, setError)
			if (areCredentialsValid === false) return

			setLoading(true)
			const response = await appContext.eventfullApiClient.authDataService.addAdmin(initialAdminRegisterInformation)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				setError("Unable to add admin. Please reload and try again.")
				return
			}
			setSuccess("Admin added successfully")
			setRegisterInformation({
				email: "",
				firstName: "",
				lastName: ""
			})
		} catch (error: unknown) {
			setErrorAxiosResponse(error, setError, "Unable to add admin")
		} finally {
			setLoading(false)
		}
	}

	return addAdmin
}
