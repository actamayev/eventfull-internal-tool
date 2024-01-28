import { observer } from "mobx-react"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"

function Dashboard() {
	useRedirectUnknownUser()

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	)
}

export default observer(Dashboard)
