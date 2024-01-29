import { observer } from "mobx-react"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import Sidebar from "../components/sidebar"

function Dashboard() {
	useRedirectUnknownUser()

	return (
		<div>
			<Sidebar />
			<h1>Dashboard</h1>
		</div>
	)
}

export default observer(Dashboard)
