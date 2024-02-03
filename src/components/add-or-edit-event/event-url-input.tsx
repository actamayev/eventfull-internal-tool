import FormGroup from "../form-group"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function EventURLInput(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleEventURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventDetails({...eventDetails, eventURL: e.target.value})
	}

	return (
		<FormGroup
			id="event-url"
			label="Event URL"
			type="text"
			placeholder="Save Princess Peach"
			onChange={handleEventURLChange}
			value={eventDetails.eventURL}
		/>
	)
}
