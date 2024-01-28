import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/dashboard"
import Missing from "./pages/missing"

export default function App() {
	return (
		<Routes>
			<Route path = "/" element = {<Login />} />
			<Route path = "/dashboard" element = {<Dashboard />} />
			<Route path = "*" element = {<Missing />} />
		</Routes>
	)
}
