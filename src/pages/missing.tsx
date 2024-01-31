import { observer } from "mobx-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import AppContext from "../contexts/eventfull-it-context"

function Missing () {
	const appContext = useContext(AppContext)

	function LinkToHome () {
		if (appContext.authClass.accessToken) {
			return <Link to = "/dashboard" className="hover:underline">Back to Dashboard</Link>
		} else {
			return <Link to = "/" className="font-bold hover:underline">Visit Our Homepage</Link>
		}
	}

	return (
		<article style = {{ padding: "100px" }}>
			<h1>Oops!</h1>
			<p>Page Not Found</p>
			<LinkToHome />
		</article>
	)
}

export default observer(Missing)
