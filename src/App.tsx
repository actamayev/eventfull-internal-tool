import { Routes, Route } from "react-router-dom"
import Login from "./pages/auth/login"
import Missing from "./pages/missing"
import AddAdmin from "./pages/add-admin"
import AddEvent from "./pages/add-event"
import ViewUser from "./pages/view-user"
import EditEvent from "./pages/edit-event"
import OTPLogin from "./pages/auth/otp-login"
import UsersDashboard from "./pages/users-dashboard"
import EventsDashboard from "./pages/events-dashboard"
import FinishAdminRegistration from "./pages/auth/finish-admin-registration"
import EventTypesAndCategoriesDashboard from "./pages/event-types-and-categories-dashboard"

import useRetrievePersonalInfo from "./hooks/retrieve-personal-info"

export default function App() {
	useRetrievePersonalInfo()

	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/add-admin" element = {<AddAdmin />} />
			<Route path = "/otp-login" element = {<OTPLogin />} />
			<Route path = "/finish-admin-registration" element = {<FinishAdminRegistration />} />

			<Route path = "/events-dashboard" element = {<EventsDashboard />} />
			<Route path = "/add-event" element = {<AddEvent />} />
			<Route path = "/edit-event/:eventId" element = {<EditEvent />} />

			<Route path = "/users-dashboard" element = {<UsersDashboard />} />
			<Route path = "/view-user/:userId" element = {<ViewUser />} />

			<Route path = "/event-types-and-categories-dashboard" element = {<EventTypesAndCategoriesDashboard />} />

			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
