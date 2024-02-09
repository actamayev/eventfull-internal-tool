import { useNavigate } from "react-router-dom"
import Button from "./button"

interface CustomCellRendererProps {
	context: {
		whereToNavigate: string
	}
}

export default function EditButtonRenderer (props: CustomCellRendererProps) {
	const navigate = useNavigate()

	const handleClick = () => navigate(props.context.whereToNavigate)

	return (
		<Button
			title="Edit event"
			onClick={handleClick}
			colorClass="bg-orange-500"
			hoverClass="hover:bg-orange-600"
			className="flex items-center justify-center font-semibold rounded-md text-s h-9 text-white p-1"
		/>
	)
}
