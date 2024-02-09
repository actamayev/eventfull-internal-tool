import { useEffect, useState } from "react"
import Button from "../button"

interface CustomCellRendererProps {
	data: {
		id: string
	}
	context: {
		adjustDeleteColumnWidth: (width: number) => void
		handleConfirmDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => Promise<void>
	}
}

export default function DeleteButtonRenderer(props: CustomCellRendererProps) {
	const [confirmDelete, setConfirmDelete] = useState(false)
	const adjustColumnWidth = props.context.adjustDeleteColumnWidth

	useEffect(() => {
		// Adjust column width when confirmDelete changes
		const newWidth = confirmDelete ? 220 : 140 // Adjust these values as needed
		adjustColumnWidth(newWidth)
	}, [confirmDelete, adjustColumnWidth])

	const handleDeleteClick = () => setConfirmDelete(true)
	const handleCancelClick = () => setConfirmDelete(false)

	if (confirmDelete === false) {
		return (
			<Button
				title="Delete event"
				onClick={handleDeleteClick}
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				className="flex items-center justify-center font-semibold rounded-md text-s h-9 text-white p-1"
			/>
		)
	}

	return (
		<div className="flex flex-row">
			<Button
				title="Confirm Delete"
				onClick={(e) => props.context.handleConfirmDelete(e, props.data.id)}
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				className="flex items-center justify-center text-white font-semibold rounded-md text-s h-9 p-1"
			/>
			<Button
				title="Cancel"
				onClick={handleCancelClick}
				colorClass="bg-gray-500"
				hoverClass="hover:bg-gray-600"
				className="ml-2 flex items-center justify-center text-white font-semibold rounded-md text-s h-9 p-1"
			/>
		</div>
	)
}
