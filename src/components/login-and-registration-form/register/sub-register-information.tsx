import { Link } from "react-router-dom"

export default function SubRegisterInformation () {
	return (
		<div className = "w-100 text-center mt-2">
			Already have an account? {""}
			<Link
				to = "/"
				className="font-bold hover:underline"
			>
				Log In
			</Link>
		</div>
	)
}
