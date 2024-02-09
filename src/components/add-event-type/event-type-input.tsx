import FormGroup from "../form-group"

interface Props {
	eventType: CreatingEventType
	setEventType: React.Dispatch<React.SetStateAction<CreatingEventType>>
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
			placeholder="Entertainment"
			onChange={handleEventTypeNameChange}
			required
			value={eventType.eventTypeName}
		/>
	)
}
