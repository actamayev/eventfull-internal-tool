import FormGroup from "../form-group"

interface Props {
	eventCategory: CreatingEventCategory | EventCategoryFromDB
	setEventCategory: (newCategoryDetails: Partial<CreatingEventCategory | EventCategoryFromDB>) => void
}

export default function EventCategoryDescriptionInput(props: Props) {
	const { eventCategory, setEventCategory } = props

	const handleEventCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventCategory({...eventCategory, description: e.target.value})
	}

	return (
		<FormGroup
			label="Event Category Description *"
			type="text"
			placeholder="Events focused on entertaining attendees through various forms of media"
			onChange={handleEventCategoryNameChange}
			required
			value={eventCategory.description}
		/>
	)
}
