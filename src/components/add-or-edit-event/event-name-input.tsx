import CharacterLimit from "../character-limit"
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
		<div className="flex items-center justify-between">
			<FormGroup
				label="Event Name *"
				type="text"
				placeholder="Save Princess Peach"
				onChange={handleEventNameChange}
				required
				value={eventDetails.eventName}
				maxLength={100}
				className="flex-grow mr-4"
			/>
			<div className="shrink-0">
				<CharacterLimit
					variable={eventDetails.eventName}
					maxLength={100}
				/>
			</div>
		</div>
	)
}
