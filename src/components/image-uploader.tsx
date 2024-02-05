import _ from "lodash"
import { useState, ChangeEvent, useRef } from "react"
import Button from "./button"

interface Props {
	eventDetailsPicturesLength: number
	selectedImages: File[]
	setSelectedImages: (files: File[]) => void
}

export default function ImageUploader(props: Props) {
	const { eventDetailsPicturesLength, selectedImages, setSelectedImages } = props
	const [previewUrls, setPreviewUrls] = useState<string[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && !_.isEmpty(e.target.files)) {
			const newFiles = Array.from(e.target.files)
			const totalFiles = selectedImages.concat(newFiles).slice(0, 10 - eventDetailsPicturesLength) // Limit to 10 images
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

	function buttonText () {
		if (selectedImages.length >= 10 - eventDetailsPicturesLength) return "Max 10 images"
		return "Choose Images"
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
				max={10 - eventDetailsPicturesLength}
			/>
			<Button
				title={buttonText()}
				colorClass="bg-violet-500"
				hoverClass="hover:bg-violet-600"
				onClick={handleButtonClick}
				className="text-white font-semibold"
				disabled={selectedImages.length >= 10 - eventDetailsPicturesLength}
			/>
			<span>
				{(selectedImages.length + eventDetailsPicturesLength) > 0 ?
					`${selectedImages.length + eventDetailsPicturesLength} file(s) selected` :
					" No file chosen"}
			</span>

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
							colorClass="bg-red-600"
							hoverClass="hover:bg-red-700"
							onClick={() => removeImage(index)}
							className="text-white font-semibold"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

