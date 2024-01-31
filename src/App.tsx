import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Missing from "./pages/missing"
import Register from "./pages/register"
import AddEvent from "./pages/add-event"
import Dashboard from "./pages/dashboard"
import UnverifiedUser from "./pages/unverified-user"

import useRetrievePersonalInfo from "./hooks/retrieve-personal-info"

export default function App() {
	useRetrievePersonalInfo()

	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/register" element = {<Register />} />
			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "/add-event" element = {<AddEvent />} />
			<Route path = "/unverified-user" element = {<UnverifiedUser />} />

			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
