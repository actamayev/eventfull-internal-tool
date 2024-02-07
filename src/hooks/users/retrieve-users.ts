import _ from "lodash"
import { useContext, useEffect } from "react"
import AppContext from "../../contexts/eventfull-it-context"
import { isErrorResponse } from "../../utils/type-checks"
import UsersClass from "../../classes/users/users-class"

export default function useRetrieveUsers(): void {
	const appContext = useContext(AppContext)

	useEffect(() => {
		if (_.isNull(appContext.eventfullApiClient.httpClient.accessToken)) return
		void retrieveUsers()
	}, [appContext.eventfullApiClient.httpClient.accessToken])

	const retrieveUsers = async (): Promise<void> => {
		try {
			const response = await appContext.eventfullApiClient.usersDataService.getUsersEvents()

			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				console.error(response)
				return
			}

			if (_.isNull(appContext.usersData)) appContext.usersData = new UsersClass()
			for (const user of response.data.users) {
				appContext.usersData.addUser(user)
			}
		} catch (error) {
			console.error(error)
		}
	}
}
