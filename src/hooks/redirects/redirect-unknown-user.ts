import _ from "lodash"
import { AxiosError } from "axios"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { isErrorResponse } from "../../utils/type-checks"
import AppContext from "../../contexts/eventfull-it-context"

export default function useRedirectUnknownUser (): void {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		const checkAndRedirect = async (): Promise<void> => {
			if (_.isNil(appContext.authClass.accessToken)) {
				navigate("/")
			} else {
				const hasUsername = await retrievePersonalData()
				if (hasUsername === false) {
					navigate("/finish-admin-registration")
				}
			}
		}
		void checkAndRedirect()
	}, [appContext.authClass.accessToken, appContext.personalData?.username])

	const retrievePersonalData = async (): Promise<boolean | void> => {
		try {
			const response = await appContext.eventfullApiClient.personalDataService.retrievePersonalData()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) return
			appContext.setAllPersonalData(response.data.personalInfo)

			return !_.isNull(appContext.personalData?.username)
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError && _.isEqual(error.response?.status, 401)) {
				// Don't hit the server again, since the token is invalid
				appContext.logout()
			}
		}
	}
}
