import CharacterLimit from "../character-limit"
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
		<div className="flex items-center justify-between">
			<FormGroup
				label="Description"
				type="text"
				placeholder="Embark on a thrilling quest through the perilous corridors of Bowser's Castle."
				value={eventDetails.eventDescription}
				onChange={handleDescriptionChange}
				multiline = {true}
				maxLength={500}
				className="flex-grow mr-4"

			/>
			<div className="shrink-0">
				<CharacterLimit
					variable={eventDetails.eventDescription}
					maxLength={500}
				/>
			</div>
		</div>
	)
}
