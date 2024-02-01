import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import Button from "../components/button"
import EventsGrid from "../components/events-grid"
import useRetrieveEvents from "../hooks/events/retrieve-events"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"

function Dashboard() {
	const navigate = useNavigate()
	useRedirectUnknownUser()
	useRetrieveEvents()

	const handleNavigateToAddEvent = () => {
		navigate("/add-event")
	}

	return (
		<div className="flex-grow">
			<div className="mx-auto w-full max-w-md">
				<h1>Dashboard</h1>
				<Button
					title = "+ Add event"
					onClick={handleNavigateToAddEvent}
					colorClass="bg-green-500"
					hoverClass="hover:bg-green-600"
				/>
			</div>
			<EventsGrid />
		</div>
	)
}

export default observer(Dashboard)
