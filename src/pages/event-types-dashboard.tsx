import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../contexts/eventfull-it-context"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import useRetrieveEventTypes from "../hooks/events/retrieve/retrieve-event-types"
import EventTypesGrid from "../components/event-types-dashboard/event-types-grid"

function EventTypesDashboard() {
	const appContext = useContext(AppContext)
	useRedirectUnknownUser()
	useRetrieveEventTypes()

	// This is here to prevent the page from rendering if the user is not logged in
	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	return (
		<div className="flex min-w-full">
			<EventTypesGrid />

		</div>
	)
}

export default observer(EventTypesDashboard)
