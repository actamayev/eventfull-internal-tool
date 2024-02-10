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
		<FormGroup
			id="type-name"
			label="Event Type Name *"
			type="text"
			placeholder="Basketball game"
			onChange={handleEventTypeNameChange}
			required
			value={eventType.eventTypeName}
		/>
	)
}
