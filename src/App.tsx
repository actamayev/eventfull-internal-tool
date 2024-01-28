import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Missing from "./pages/missing"
import Register from "./pages/register"

export default function App() {
	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/login" element = {<Login />} />
			<Route path = "/register" element = {<Register />} />
			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
