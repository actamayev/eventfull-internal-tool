import { Link } from "react-router-dom"

interface Props {
	href: string
	title: string
	css?: string
}

export default function CustomLink(props:Props) {
	const { css, href, title } = props
	return (
		<Link to={href} className={`${css} block`}>
			{title}
		</Link>
	)
}

export function TopNavLink(props:Props) {
	const css = "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
	return (
		<CustomLink css = {css} {...props} />
	)
}

export function VerticalNavLink(props:Props) {
	const css = "px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
	return (
		<li className="list-none">
			<CustomLink css={css} {...props} />
		</li>
	)
}
