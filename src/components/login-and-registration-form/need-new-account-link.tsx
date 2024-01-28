import { Link } from "react-router-dom"

interface Props {
	loginOrSignUp: "Login" | "Sign up"
}

export default function NeedNewAccountLink (props: Props) {
	const { loginOrSignUp } = props

	if (loginOrSignUp !== "Login") return null

	return (
		<div className = "w-100 text-center mt-2">
			Need an account?
			<Link
				to = "/register"
				className = "font-bold"
			>
				Sign Up
			</Link>
		</div>
	)
}
