import _ from "lodash"
import { useState, ChangeEvent, useRef } from "react"
import Button from "./button"

interface Props {
	selectedImages: File[]
	setSelectedImages: (files: File[]) => void
}

export default function ImageUploader(props: Props) {
	const { selectedImages, setSelectedImages } = props
	const [previewUrls, setPreviewUrls] = useState<string[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const newFiles = Array.from(e.target.files)
			const totalFiles = selectedImages.concat(newFiles).slice(0, 10) // Limit to 10 images
			setSelectedImages(totalFiles)

			const newPreviewUrls = totalFiles.map(file => URL.createObjectURL(file))
			setPreviewUrls(newPreviewUrls)
		}
		if (_.isNull(fileInputRef.current)) return
		fileInputRef.current.value = ""
	}

	const removeImage = (index: number) => {
		const updatedFiles = selectedImages.filter((a, idx) => idx !== index)
		setSelectedImages(updatedFiles)

		const updatedPreviewUrls = updatedFiles.map(file => URL.createObjectURL(file))
		setPreviewUrls(updatedPreviewUrls)
	}

	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<div className="mb-2">
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleImageChange}
				multiple
				accept="image/*"
				style={{ display: "none" }}
			/>
			<Button
				title="Choose Images"
				colorClass="bg-blue-300"
				hoverClass="hover:bg-blue-400"
				onClick={handleButtonClick}
			/>
			<span>{selectedImages.length > 0 ? `${selectedImages.length} file(s) selected` : " No file chosen"}</span>

			<div className="preview-container">
				{previewUrls.map((url, index) => (
					<div key={index} style={{ position: "relative", display: "inline-block", margin: "5px" }}>
						<img
							src={url}
							alt={`Preview ${index}`}
							style={{ maxWidth: "35%", height: "auto" }}
						/>
						<Button
							title="Remove"
							colorClass="bg-red-500"
							hoverClass="hover:bg-red-600"
							onClick={() => removeImage(index)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

