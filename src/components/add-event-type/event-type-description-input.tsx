import FormGroup from "../form-group"
import CharacterLimit from "../character-limit"

interface Props {
	eventType: CreatingEventType | EventTypeFromDB
	setEventType: (newTypeDetails: Partial<CreatingEventType | EventTypeFromDB>) => void
}

export default function EventTypeDescriptionInput(props: Props) {
	const { eventType, setEventType } = props

	const handleEventTypeDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventType({...eventType, description: e.target.value})
	}

	return (
		<div className="flex items-center justify-between">
			<FormGroup
				label="Description *"
				type="text"
				placeholder="A competetive basketball match."
				onChange={handleEventTypeDescriptionChange}
				required
				value={eventType.description}
				maxLength={100}
				className="flex-grow mr-4"
			/>
			<div className="shrink-0">
				<CharacterLimit
					variable={eventType.description}
					maxLength={100}
				/>
			</div>
		</div>
	)
}
