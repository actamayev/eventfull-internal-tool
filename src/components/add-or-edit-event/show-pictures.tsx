interface Props {
	eventDetails: EventFromDB
}

export default function ShowPictures(props: Props) {
	const { eventDetails } = props

	return (
		<>
			{eventDetails.eventImages.map((image) => (
				image.imageURL ?
					<div key={image.imageId}>
						<img
							src={image.imageURL}
							alt={`Event Image ${image.imageId}`}
							style={{ maxWidth: "35%", height: "auto" }}
						/>
					</div> : null
			))}
		</>
	)
}
