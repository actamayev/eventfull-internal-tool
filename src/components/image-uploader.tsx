import { useState, ChangeEvent } from "react"

interface Props {
	setSelectedFiles: (files: File[]) => void
}

export default function ImageUploader (props: Props) {
	const { setSelectedFiles } = props
	const [previewUrls, setPreviewUrls] = useState<string[]>([])

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const files = Array.from(e.target.files)
			setSelectedFiles(files)

			const newPreviewUrls = files.map(file => URL.createObjectURL(file))
			setPreviewUrls(newPreviewUrls)
		}
	}

	return (
		<div>
			<input
				type="file"
				onChange={handleImageChange}
				multiple
				accept="image/*"
			/>
			<div className="preview-container">
				{previewUrls.map((url, index) => (
					<img key={index} src={url} alt={`Preview ${index}`} style={{ width: "100px", height: "100px" }} />
				))}
			</div>
		</div>
	)
}
