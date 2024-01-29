interface Props {
	loginOrSignUp: "Login" | "Sign up",
	children: React.ReactNode,
}

export default function AuthTemplate(props: Props) {
	const { loginOrSignUp, children } = props

	return (
		<div className = "flex justify-center">
			<div className = "mt-5 bg-white border shadow rounded-lg p-6 w-7/12 mx-auto">
				<h1
					className = "flex justify-center mx-auto mb-4 text-5xl font-extrabold \
						leading-none tracking-tight text-gray-900"
				>
					{loginOrSignUp}
				</h1>
				{children}
			</div>
		</div>
	)
}

