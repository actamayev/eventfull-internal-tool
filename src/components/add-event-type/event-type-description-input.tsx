import FormGroup from "../form-group"

interface Props {
	eventType: CreatingEventType
	setEventType: React.Dispatch<React.SetStateAction<CreatingEventType>>
}

export default function EventTypeDescriptionInput(props: Props) {
	const { eventType, setEventType } = props

	const handleEventTypeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventType({...eventType, description: e.target.value})
	}

	return (
		<FormGroup
			id="type-description"
			label="Description *"
			type="text"
			placeholder="A competetive basketball match."
			onChange={handleEventTypeNameChange}
			required
			value={eventType.description}
		/>
	)
}
