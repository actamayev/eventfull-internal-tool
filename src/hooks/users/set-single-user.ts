import _ from "lodash"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../../utils/type-checks"
import extractUserData from "../../utils/users/extract-user-data"

export default function useSetSingleUser(
	userId: string | undefined,
): UserFromDB | undefined {
	const appContext = useContext(AppContext)
	const [retrievedUser, setRetrievedUser] = useState<UserFromDB | undefined>(undefined)

	useEffect(() => {
		if (
			_.isNull(appContext.authClass.accessToken) ||
			_.isNil(appContext.personalData?.username) ||
			_.isNull(appContext.usersData) ||
			_.isUndefined(userId)
		) return

		const user = appContext.usersData.contextForUser(userId)
		if (!_.isUndefined(user)) {
			const extractedUser = extractUserData(user)
			setRetrievedUser(extractedUser)
		} else {
			void setSingleUser()
		}
	}, [appContext.authClass.accessToken, appContext.personalData?.username, appContext.usersData])

	const setSingleUser = async (): Promise<SingleUserResponse | void> => {
		try {
			if (_.isUndefined(userId)) return
			const response = await appContext.eventfullApiClient.usersDataService.getUserById(userId)
			if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				throw new Error("Failed to retrieve user")
			}
			setRetrievedUser(response.data.user) // Update the state with the fetched user

		} catch (err) {
			console.error(err)
		}
	}

	return retrievedUser
}
