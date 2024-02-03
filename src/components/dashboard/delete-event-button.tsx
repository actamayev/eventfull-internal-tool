import _ from "lodash"
import { useContext, useEffect, useState } from "react"
import { CustomCellRendererProps } from "ag-grid-react"
import Button from "../button"
import AppContext from "../../contexts/eventfull-it-context"
import { isErrorResponses } from "../../utils/type-checks"

export default function DeleteButtonRenderer(props: CustomCellRendererProps) {
	const appContext = useContext(AppContext)
	const [confirmDelete, setConfirmDelete] = useState(false)
	const adjustColumnWidth = props.context.adjustDeleteColumnWidth

	useEffect(() => {
		// Adjust column width when confirmDelete changes
		const newWidth = confirmDelete ? 220 : 100 // Adjust these values as needed
		adjustColumnWidth(newWidth)
	}, [confirmDelete, adjustColumnWidth])

	// TODO: When this is clicked, it should widen the grid to show the delete button
	const handleDeleteClick = () => setConfirmDelete(true)
	const handleCancelClick = () => setConfirmDelete(false)

	// TODO: The grid shouldn't shrink back to its original size after the delete button is clicked
	const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault()
			const response = await appContext.eventfullApiClient.eventsDataService.deleteEvent(props.data.eventId)
			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				console.error(response)
				return
			}
			appContext.eventsData?.removeEvent(props.data.eventId)
		} catch (error) {
			console.error(error)
		}
	}

	if (confirmDelete === false) {
		return (
			<Button
				title="Delete"
				onClick={handleDeleteClick}
				colorClass="bg-red-500"
				hoverClass="hover:bg-red-600"
				className="flex items-center justify-center text-white font-semibold rounded-md text-s h-9 my-0.5"
			/>
		)
	}

	return (
		<div className="flex flex-row">
			<Button
				title="Confirm Delete"
				onClick={handleConfirmDelete}
				colorClass="bg-red-600"
				hoverClass="hover:bg-red-700"
				className="flex items-center justify-center text-white font-bold rounded-md text-s h-9 my-0.5"
			/>
			<Button
				title="Cancel"
				onClick={handleCancelClick}
				colorClass="bg-gray-500"
				hoverClass="hover:bg-gray-600"
				className="ml-2 flex items-center justify-center text-white font-semibold rounded-md text-s h-9 my-0.5"
			/>
		</div>
	)
}
