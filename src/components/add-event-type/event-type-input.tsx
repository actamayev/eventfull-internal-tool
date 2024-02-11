import CharacterLimit from "../character-limit"
import FormGroup from "../form-group"

interface Props {
	eventType: CreatingEventType | EventTypeFromDB
	setEventType: (newTypeDetails: Partial<CreatingEventType | EventTypeFromDB>) => void
}

export default function EventTypeNameInput(props: Props) {
	const { eventType, setEventType } = props

	const handleEventTypeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventType({...eventType, eventTypeName: e.target.value})
	}

	return (
		<div className="flex items-center justify-between">

			<FormGroup
				label="Event Type Name *"
				type="text"
				placeholder="Basketball game"
				onChange={handleEventTypeNameChange}
				required
				value={eventType.eventTypeName}
				maxLength={20}
				className="flex-grow mr-4"
			/>
			<div className="shrink-0">
				<CharacterLimit
					variable={eventType.eventTypeName}
					maxLength={20}
				/>
			</div>
		</div>
	)
}
