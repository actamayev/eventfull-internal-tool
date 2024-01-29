export default function isAuthCredentials(
	credentials: AuthCredentials | RegisterCredentials
): credentials is AuthCredentials {
	return "contact" in credentials
}
