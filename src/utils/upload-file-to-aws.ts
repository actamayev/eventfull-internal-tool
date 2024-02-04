import axios from "axios"

export default async function uploadFileToS3(file: File, presignedURL: string): Promise<string> {
	try {
		const options = {
			headers: {
				"Content-Type": file.type
			},
		}

		await axios.put(presignedURL, file, options)

		// Construct the S3 file URL
		const fileUrl = presignedURL.split("?")[0] // Removes the query parameters
		return fileUrl
	} catch (error) {
		console.error("Error uploading file to S3:", error)
		throw error
	}
}
