import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../contexts/eventfull-it-context"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import useRetrieveEventCategories from "../hooks/events/retrieve/retrieve-event-categories"
import EventCategoriesGrid from "../components/event-categories-dashboard/event-categories-grid"

function EventCategoriesDashboard() {
	const appContext = useContext(AppContext)
	useRedirectUnknownUser()
	useRetrieveEventCategories()

	// This is here to prevent the page from rendering if the user is not logged in
	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	return (
		<div className="flex min-w-full">
			<EventCategoriesGrid />

		</div>
	)
}

export default observer(EventCategoriesDashboard)
