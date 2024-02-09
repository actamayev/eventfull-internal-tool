import FormGroup from "../form-group"

interface Props {
	eventCategory: CreatingEventCategory
	setEventCategory: React.Dispatch<React.SetStateAction<CreatingEventCategory>>
}

export default function EventCategoryDescriptionInput(props: Props) {
	const { eventCategory, setEventCategory } = props

	const handleEventCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventCategory({...eventCategory, description: e.target.value})
	}

	return (
		<FormGroup
			id="category-description"
			label="Event Category Description *"
			type="text"
			placeholder="Events focused on entertaining attendees through various forms of media"
			onChange={handleEventCategoryNameChange}
			required
			value={eventCategory.description}
		/>
	)
}
