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
			colorClass="bg-orange-500"
			hoverClass="hover:bg-orange-600"
			className="flex items-center justify-center font-semibold rounded-md text-s h-9 text-white p-1"
		/>
	)
}
