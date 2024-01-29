import _ from "lodash"
import { useContext, useEffect } from "react"
import AppContext from "../contexts/eventfull-it-context"
import { isErrorResponse } from "../utils/type-checks"

export default function useRetrievePersonalInfo(): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (_.isNull(appContext.eventfullApiClient.httpClient.accessToken)) return
		void retrievePersonalData()
	}, [appContext.eventfullApiClient.httpClient.accessToken])

	const retrievePersonalData = async (): Promise<void> => {
		try {
			const response = await appContext.eventfullApiClient.personalDataService.retrievePersonalData()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) return
			appContext.setPersonalData(response.data.personalInfo)
		} catch (error) {
			console.error(error)
		}
	}
}
