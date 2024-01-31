import useRedirectKnownUser from "../hooks/redirects/redirect-known-user"

export default function UnverifiedUser () {
	useRedirectKnownUser()

	return (
		<article style = {{ padding: "100px" }}>
			<h1>
				Your Account has not been verified yet.
				Please contact the administrator.
			</h1>
		</article>
	)
}
