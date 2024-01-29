import { Link } from "react-router-dom"

export default function NeedNewAccountLink () {
	return (
		<div className = "w-100 text-center mt-2">
			Need an account? {""}
			<Link
				to = "/register"
				className="font-bold hover:underline"
			>
				Sign Up
			</Link>
		</div>
	)
}
