import FormGroup from "../form-group"

interface Props {
	eventCategory: CreatingEventCategory | EventCategoryFromDB
	setEventCategory: (newCategoryDetails: Partial<CreatingEventCategory | EventCategoryFromDB>) => void
}

export default function EventCategoryNameInput(props: Props) {
	const { eventCategory, setEventCategory } = props

	const handleEventCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventCategory({...eventCategory, eventCategoryName: e.target.value})
	}

	return (
		<FormGroup
			id="category-name"
			label="Event Category Name *"
			type="text"
			placeholder="Entertainment"
			onChange={handleEventCategoryNameChange}
			required
			value={eventCategory.eventCategoryName}
		/>
	)
}
