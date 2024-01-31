import { Link } from "react-router-dom"
import classNames from "classnames" // This is a utility for conditionally joining classNames together

interface Props {
	href: string
	title: string
	css?: string
	disabled?: boolean
	onClick?: () => void
}

export default function CustomLink(props: Props) {
	const { css, href, title, onClick, disabled } = props

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		if (disabled) {
			e.preventDefault() // Prevent navigation if disabled
			return
		}
		onClick?.() // Call onClick if not disabled
	}

	const linkClasses = classNames(css, {
		"opacity-50 cursor-not-allowed": disabled
	})

	return (
		<Link
			to={href}
			className={`${linkClasses} block`}
			onClick={handleClick}
		>
			{title}
		</Link>
	)
}

export function TopNavLink(props: Props) {
	const css = "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
	return (
		<CustomLink css = {css} {...props} />
	)
}

export function VerticalNavLink(props: Props) {
	const css = "px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
	return (
		<li className="list-none">
			<CustomLink css={css} {...props} />
		</li>
	)
}
