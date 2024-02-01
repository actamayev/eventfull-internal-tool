import _ from "lodash"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../contexts/eventfull-it-context"

export default function useRedirectUnknownUser (): void {
	const appContext = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (_.isNil(appContext.authClass.accessToken)) {
			navigate("/")
			return
		} else if (_.isNil(appContext.personalData?.username)) {
			navigate("/finish-admin-registration")
			return
		}
	}, [appContext.authClass.accessToken, appContext.personalData?.username])
}
