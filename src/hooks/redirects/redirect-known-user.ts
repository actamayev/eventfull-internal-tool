import _ from "lodash"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../contexts/eventfull-it"

const useRedirectKnownUser = (): void => {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (!_.isNull(appContext.authClass.accessToken)) {
			navigate("/dashboard")
		}
	}, [])
}

export default useRedirectKnownUser
