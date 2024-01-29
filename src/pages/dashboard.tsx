import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import Button from "../components/button"

function Dashboard() {
	const navigate = useNavigate()
	useRedirectUnknownUser()

	const handleNavigateToAddEvent = () => {
		navigate("/add-event")
	}
	return (
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
	)
}

export default observer(Dashboard)
