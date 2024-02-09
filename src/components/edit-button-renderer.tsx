import { useNavigate } from "react-router-dom"
import Button from "./button"

interface CustomCellRendererProps {
	data: {
		id: string
	}
	context: {
		whatIsThis: string
		getNavigationPath: (id: string) => string
	}
}

export default function EditButtonRenderer (props: CustomCellRendererProps) {
	// TODO: Vary the width of the button based on the length of the text
	const navigate = useNavigate()

	const handleClick = () => {
		const path = props.context.getNavigationPath(props.data.id)
		navigate(path)
	}

	return (
		<Button
			title={`Edit ${props.context.whatIsThis}`}
			onClick={handleClick}
			colorClass="bg-orange-500"
			hoverClass="hover:bg-orange-600"
			className="flex items-center justify-center font-semibold rounded-md text-s h-9 text-white p-1"
		/>
	)
}
