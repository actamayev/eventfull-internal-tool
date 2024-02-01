import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import AppContext from "../contexts/eventfull-it-context"

export default function Missing () {
	const appContext = useContext(AppContext)

	const LinkToHome = observer(() => {
		if (!_.isNull(appContext.authClass.accessToken)) {
			return <Link to = "/dashboard" className="hover:underline">Back to Dashboard</Link>
		} else {
			return <Link to = "/" className="font-bold hover:underline">Login</Link>
		}
	})

	return (
		<article style = {{ padding: "100px" }}>
			<h1>Oops!</h1>
			<p>Page Not Found</p>
			<LinkToHome />
		</article>
	)
}
