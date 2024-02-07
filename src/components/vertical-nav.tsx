import { VerticalNavLink } from "./custom-link"

export default function VerticalNavBar() {
	return (
		<nav className="w-50 flex flex-col h-full justify-center mt-2 ml-2">
			<ul className="space-y-2">
				<VerticalNavLink href = "/events-dashboard" title = "Events Dashboard"/>
				<VerticalNavLink href = "/users-dashboard" title = "Users Dashboard"/>
				<VerticalNavLink href = "/event-types-and-categories-dashboard" title = "Event Types & Categories"/>
				<VerticalNavLink href = "/add-admin" title = "Add Admin"/>
			</ul>
		</nav>
	)
}
