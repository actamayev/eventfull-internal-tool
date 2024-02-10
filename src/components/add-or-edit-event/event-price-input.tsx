import FormGroup from "../form-group"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function EventPriceInput(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleEventPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventDetails({...eventDetails, eventPrice: Number(e.target.value)})
	}

	return (
		<FormGroup
			label="Price ($)"
			type="number"
			placeholder="$69.42"
			onChange={handleEventPriceChange}
			required
			value={eventDetails.eventPrice.toString()}
			minValue= {0}
			step= {0.01}
		/>
	)
}
