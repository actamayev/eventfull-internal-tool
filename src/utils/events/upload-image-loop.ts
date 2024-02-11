import _ from "lodash"
import uploadFileToS3 from "../upload-file-to-aws"

export default async function uploadImageLoop(
	selectedFiles: File[],
	imagesURLsData: ImageURLsResponse[],
): Promise<ImageURLs[]> {
	const imageURLs: ImageURLs[] = imagesURLsData.map((imageURLData) => ({
		imageId: imageURLData.imageId, imageURL: "", isActive: true
	}))

	for (let i = 0; i < _.size(selectedFiles); i++) {
		const file = selectedFiles[i]
		const imageId = imagesURLsData[i].imageId
		const presignedUrl = imagesURLsData[i].presignedUrl
		const uploadedImageUrl = await uploadFileToS3(file, presignedUrl)

		// Find the corresponding object in imageURLs array and update its imageURL
		const index = imageURLs.findIndex(item => item.imageId === imageId)
		// eslint-disable-next-line max-depth
		if (index !== -1) imageURLs[index].imageURL = uploadedImageUrl
	}
	return imageURLs
}
