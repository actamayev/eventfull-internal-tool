import { Link } from "react-router-dom"

export default function SubRegisterInformation () {
	return (
		<div className = "w-100 text-center mt-2">
			Already have an account?
			<Link
				to = {"/login"}
				className = "font-bold"
			>
				Log In
			</Link>
		</div>
	)
}
