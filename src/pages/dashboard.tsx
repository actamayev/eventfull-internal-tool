import { observer } from "mobx-react"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import Sidebar from "../components/sidebar"
import { useNavigate } from "react-router-dom"
import Button from "../components/button"

function Dashboard() {
	const navigate = useNavigate()
	useRedirectUnknownUser()

	const handleNavigateToAddEvent = () => {
		navigate("/add-event")
	}
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-grow">
				<div className="mx-auto w-full max-w-md">
					<h1>Dashboard</h1>
					<Button
						title = "Add event"
						onClick={handleNavigateToAddEvent}
						colorClass="bg-green-500"
						hoverClass="hover:bg-green-600"
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(Dashboard)
