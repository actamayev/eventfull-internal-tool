import FormGroup from "../form-group"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function DescriptionInput(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventDetails({ ...eventDetails, eventDescription: e.target.value })
	}

	return (
		<FormGroup
			id="description"
			label="Description"
			type="text"
			placeholder="Embark on a thrilling quest through the perilous corridors of Bowser's Castle."
			value={eventDetails.eventDescription}
			onChange={handleDescriptionChange}
			// multiline = {true}
		/>
	)
}
