import _ from "lodash"
import { useContext, useEffect } from "react"
import { isErrorResponse } from "../utils/type-checks"
import AppContext from "../contexts/eventfull-it-context"
import PersonalInfoClass from "../classes/personal-info-class"

export default function useRetrievePersonalInfo(): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (
			_.isNull(appContext.eventfullApiClient.httpClient.accessToken) ||
			_.isNil(appContext.personalData?.username)
		) return
		void retrievePersonalData()
	}, [appContext.eventfullApiClient.httpClient.accessToken, appContext.personalData?.username])

	const retrievePersonalData = async (): Promise<void> => {
		try {
			if (_.isNull(appContext.personalData)) appContext.personalData = new PersonalInfoClass()

			if (
				!_.isNull(appContext.personalData.firstName) &&
				!_.isNull(appContext.personalData.lastName) &&
				!_.isNull(appContext.personalData.username) &&
				!_.isNull(appContext.personalData.email)
			) return

			const response = await appContext.eventfullApiClient.personalDataService.retrievePersonalData()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) return
			appContext.setAllPersonalData(response.data.personalInfo)
		} catch (error) {
			console.error(error)
		}
	}
}
