import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../contexts/eventfull-it-context"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import useRetrieveEventTypes from "../hooks/events/retrieve-event-types"
import useRetrieveEventCategories from "../hooks/events/retrieve-event-categories"
import EventTypesGrid from "../components/event-types-and-categories-dashboard/event-types-grid"

function EventsDashboard() {
	const appContext = useContext(AppContext)
	useRedirectUnknownUser()
	useRetrieveEventTypes()
	useRetrieveEventCategories

	// This is here to prevent the page from rendering if the user is not logged in
	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	return (
		<>
			<EventTypesGrid />

		</>
	)
}

export default observer(EventsDashboard)
