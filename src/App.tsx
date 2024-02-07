import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Missing from "./pages/missing"
import AddAdmin from "./pages/add-admin"
import OTPLogin from "./pages/otp-login"
import AddEvent from "./pages/add-event"
import EditEvent from "./pages/edit-event"
import UserDashboard from "./pages/user-dashboard"
import EventDashboard from "./pages/event-dashboard"
import FinishAdminRegistration from "./pages/finish-admin-registration"

import useRetrievePersonalInfo from "./hooks/retrieve-personal-info"
import ViewUser from "./pages/view-user"

export default function App() {
	useRetrievePersonalInfo()

	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/add-admin" element = {<AddAdmin />} />
			<Route path = "/otp-login" element = {<OTPLogin />} />
			<Route path = "/finish-admin-registration" element = {<FinishAdminRegistration />} />

			<Route path = "/event-dashboard" element = {<EventDashboard />} />
			<Route path = "/add-event" element = {<AddEvent />} />
			<Route path = "/edit-event/:eventId" element = {<EditEvent />} />

			<Route path = "/user-dashboard" element = {<UserDashboard />} />
			<Route path = "/view-user/:userId" element = {<ViewUser />} />

			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
