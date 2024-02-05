import { useState } from "react"
import Button from "../button"

interface Props {
	image: ImageURLs
	removeImage: (imageId: string) => void
}

export default function EventPicture(props: Props) {
	const { image, removeImage } = props
	const [confirmDelete, setConfirmDelete] = useState(false)

	const handleDeleteClick = () => setConfirmDelete(true)
	const handleCancelClick = () => setConfirmDelete(false)

	if (image.isActive === false) return null

	function DeleteButton() {
		if (confirmDelete === false) {
			return (
				<Button
					title="Remove"
					onClick={handleDeleteClick}
					colorClass="bg-red-600"
					hoverClass="hover:bg-red-700"
					className="flex items-center justify-center font-semibold rounded-md text-s h-9 my-0.5 text-white"
				/>
			)
		}
		return (
			<div className="flex flex-row">
				<Button
					title="Confirm Delete"
					onClick={() => removeImage(image.imageId)}
					colorClass="bg-red-600"
					hoverClass="hover:bg-red-700"
					className="flex items-center justify-center text-white font-semibold rounded-md text-s h-9 mt-0.5"
				/>
				<Button
					title="Cancel"
					onClick={handleCancelClick}
					colorClass="bg-gray-500"
					hoverClass="hover:bg-gray-600"
					className="ml-2 flex items-center justify-center text-white font-semibold rounded-md text-s h-9"
				/>
			</div>
		)
	}
	return (
		<>
			<img
				src={image.imageURL}
				alt={`Event Image ${image.imageId}`}
				style={{ maxWidth: "35%", height: "auto" }}
			/>
			<DeleteButton />
		</>
	)
}
