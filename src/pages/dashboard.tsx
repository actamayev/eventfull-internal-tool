import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import EventsGrid from "../components/dashboard/events-grid"
import AppContext from "../contexts/eventfull-it-context"
import useRetrieveEvents from "../hooks/events/retrieve-events"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"

function Dashboard() {
	const appContext = useContext(AppContext)
	useRedirectUnknownUser()
	useRetrieveEvents()

	// This is here to prevent the page from rendering if the user is not logged in
	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	return <EventsGrid />
}

export default observer(Dashboard)
