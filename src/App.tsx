import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Missing from "./pages/missing"
import AddAdmin from "./pages/add-admin"
import OTPLogin from "./pages/otp-login"
import AddEvent from "./pages/add-event"
import Dashboard from "./pages/dashboard"
import FinishAdminRegistration from "./pages/finish-admin-registration"

import useRetrievePersonalInfo from "./hooks/retrieve-personal-info"

export default function App() {
	useRetrievePersonalInfo()

	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/add-admin" element = {<AddAdmin />} />
			<Route path = "/otp-login" element = {<OTPLogin />} />
			<Route path = "/finish-admin-registration" element = {<FinishAdminRegistration />} />

			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "/add-event" element = {<AddEvent />} />

			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
