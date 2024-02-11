import FormGroup from "../form-group"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function EventNameInput(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventDetails({...eventDetails, eventName: e.target.value})
	}

	return (
		<FormGroup
			label="Event Name *"
			type="text"
			placeholder="Save Princess Peach"
			onChange={handleEventNameChange}
			required
			value={eventDetails.eventName}
		/>
	)
}
