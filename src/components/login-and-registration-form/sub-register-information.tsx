import { Link } from "react-router-dom"

interface Props {
	loginOrSignUp: "Login" | "Sign up"
}

export default function SubRegisterInformation (props: Props) {
	const { loginOrSignUp } = props

	if (loginOrSignUp !== "Sign up") return null
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
