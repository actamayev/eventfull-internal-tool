import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../contexts/eventfull-it-context"
import useRetrieveUsers from "../hooks/users/retrieve-users"
import UsersGrid from "../components/users-dashboard/users-grid"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"

function UsersDashboard() {
	const appContext = useContext(AppContext)
	useRedirectUnknownUser()
	useRetrieveUsers()

	// This is here to prevent the page from rendering if the user is not logged in
	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	return <UsersGrid />
}

export default observer(UsersDashboard)
