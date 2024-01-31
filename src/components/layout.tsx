import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../contexts/eventfull-it-context"
import { isErrorResponse } from "../utils/type-checks"
import VerticalNavBar from "./vertical-nav"
import CustomLink, { TopNavLink } from "./custom-link"

interface Props {
	children: React.ReactNode
}

function Layout (props: Props) {
	const { children } = props
	const appContext = useContext(AppContext)
	const navigate = useNavigate()
	const [logoutDisabled, setLogoutDisabled] = useState(false)

	const handleLogout = async (): Promise<void> => {
		try {
			setLogoutDisabled(true)
			const response = await appContext.eventfullApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			appContext.logout()
			navigate("/")
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}

	function LinkToHome() {
		return (
			<CustomLink
				href={!_.isNull(appContext.authClass.accessToken) ? "/dashboard" : "/"}
				title="Eventfull"
				css = "text-gray-200 hover:text-white font-bold text-xl"
			/>
		)
	}

	function LoginLogout () {
		if (_.isNull(appContext.authClass.accessToken)) {
			return <TopNavLink href = "/" title = "Login"/>
		}
		return (
			<TopNavLink
				href = "/"
				title = "Logout"
				onClick={handleLogout}
				disabled = {logoutDisabled}
			/>
		)
	}

	function ShowVerticalNavBar () {
		if (_.isNull(appContext.authClass.accessToken)) return null
		return <VerticalNavBar />
	}

	return (
		<div>
			<nav className="bg-gray-900">
				<div className="mx-auto px-4 flex justify-between h-16">
					<div className="flex items-center">
						<LinkToHome />
					</div>
					<div className="flex items-center space-x-4">
						<LoginLogout />
					</div>
				</div>
			</nav>
			<div className="flex flex-row">
				<ShowVerticalNavBar />
				<div className="flex-1 w-full bg-white overflow-y-auto px-20 py-14">
					{children}
				</div>
			</div>
		</div>
	)
}

export default observer(Layout)
