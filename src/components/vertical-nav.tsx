import { VerticalNavLink } from "./custom-link"

export default function VerticalNavBar() {
	return (
		<nav className="w-40 flex flex-col h-full justify-center mt-2 ml-2">
			<ul className="space-y-2">
				<VerticalNavLink href = "/event-dashboard" title = "Event Dashboard"/>
				<VerticalNavLink href = "/user-dashboard" title = "User Dashboard"/>
				<VerticalNavLink href = "/add-admin" title = "Add Admin"/>
			</ul>
		</nav>
	)
}
