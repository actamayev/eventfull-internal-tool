import { VerticalNavLink } from "./custom-link"

export default function VerticalNavBar() {
	return (
		<nav className="w-40 bg-gray-100 flex flex-col h-full justify-center mt-2 ml-2">
			<ul className="space-y-2">
				<VerticalNavLink href = "/dashboard" title = "Dashboard"/>
				<VerticalNavLink href = "/add-admin" title = "Add Admin"/>
			</ul>
		</nav>
	)
}
