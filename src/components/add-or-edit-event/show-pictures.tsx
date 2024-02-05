import EventPicture from "./event-picture"

interface Props {
	eventDetails: EventFromDB
	setEventDetails: React.Dispatch<React.SetStateAction<EventFromDB>>
}

export default function ShowPictures(props: Props) {
	const { eventDetails, setEventDetails } = props

	const removeImage = (imageId: string) => {
		const updatedImages = eventDetails.eventImages.map(image =>
			image.imageId === imageId ? { ...image, isActive: false } : image
		)
		setEventDetails({ ...eventDetails, eventImages: updatedImages })
	}

	return (
		<>
			{eventDetails.eventImages.map((image) => (
				image.imageURL && image.isActive === true ?
					<div key={image.imageId}>
						<EventPicture image={image} removeImage={removeImage} />
					</div> : null
			))}
		</>
	)
}
