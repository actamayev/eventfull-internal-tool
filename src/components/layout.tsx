import _ from "lodash"
import { observer } from "mobx-react"
import { useContext, useState } from "react"
import AppContext from "../contexts/eventfull-it-context"
import { isErrorResponse } from "../utils/type-checks"
import VerticalNavBar from "./vertical-nav"
import CustomLink, { TopNavLink } from "./custom-link"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props
	const appContext = useContext(AppContext)
	const [logoutDisabled, setLogoutDisabled] = useState(false)

	const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): Promise<void> => {
		try {
			e.preventDefault()
			setLogoutDisabled(true)
			const response = await appContext.eventfullApiClient.authDataService.logout()
			if (!_.isEqual(response.status, 200) || isErrorResponse(response.data)) {
				throw new Error("Failed to logout")
			}
			appContext.logout() // Automatically navigates to home page after logout (via the redirect unknown user hook)
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}

	const LinkToHome = observer(() => {
		return (
			<CustomLink
				href={!_.isNull(appContext.authClass.accessToken) ? "/event-dashboard" : "/"}
				title="Eventfull"
				css = "text-gray-200 hover:text-white font-bold text-xl"
			/>
		)
	})

	const LoginLogout = observer(() => {
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
	})

	const ShowVerticalNavBar = observer(() => {
		if (
			_.isNull(appContext.authClass.accessToken) ||
			_.isNil(appContext.personalData?.username)
		) return null
		return <VerticalNavBar />
	})

	return (
		<div>
			<nav className="bg-gray-900">
				<div className="flex justify-between h-16">
					<div className="flex items-center ml-4">
						<LinkToHome />
					</div>
					<div className="flex items-center mr-4">
						<LoginLogout />
					</div>
				</div>
			</nav>
			<div className="flex flex-row">
				<ShowVerticalNavBar />
				<div className="flex-1 w-full bg-white overflow-y-auto px-10 py-8">
					{children}
				</div>
			</div>
		</div>
	)
}
