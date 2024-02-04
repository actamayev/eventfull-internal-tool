import { useNavigate } from "react-router-dom"
import { CustomCellRendererProps } from "ag-grid-react"
import Button from "../button"

export default function EditButtonRenderer (props: CustomCellRendererProps) {
	const navigate = useNavigate()

	const handleClick = () => navigate(`/edit-event/${props.data.eventId}`)

	return (
		<Button
			title="Edit event"
			onClick={handleClick}
			colorClass="bg-blue-600"
			hoverClass="hover:bg-blue-700"
			className="flex items-center justify-center text-white font-semibold rounded-md text-s h-9 my-0.5"
		/>
	)
}
