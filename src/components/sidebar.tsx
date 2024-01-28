import _ from "lodash"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AppContext from "../contexts/eventfull-it"
import { isErrorResponse } from "../utils/type-checks"
import Button from "./button"

function Sidebar() {
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
			console.log(response.data)
			appContext.logout()
			navigate("/login")
		} catch (error) {
			console.error(error)
		} finally {
			setLogoutDisabled(false)
		}
	}

	return (
		<div className="fixed left-0 top-0 h-full w-30 bg-gray-800 text-white flex flex-col justify-between">
			<div className="flex items-center justify-start p-4">
				{/* <img src="path-to-your-image.jpg" alt="Logo" className="h-8 w-8 mr-2" /> */}
				<span className="text-lg font-semibold">Eventfull</span>
			</div>
			<div className="p-4 text-center">
				<div className="mb-4">
					{appContext.personalData?.username}
				</div>
				<Button
					title = "Logout"
					onClick={handleLogout}
					disabled={logoutDisabled}
					colorClass="bg-red-500"
					hoverClass="hover:bg-red-600"
				/>
			</div>
		</div>
	)
}

export default observer(Sidebar)
