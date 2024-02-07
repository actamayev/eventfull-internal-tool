import _ from "lodash"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../contexts/eventfull-it-context"

export default function useRedirectKnownUser (): void  {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!_.isNil(appContext.authClass.accessToken)) {
			navigate("/event-dashboard")
		}
	}, [])
}
