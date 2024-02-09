import FormGroup from "../form-group"

interface Props {
	eventCategory: CreatingEventCategory
	setEventCategory: React.Dispatch<React.SetStateAction<CreatingEventCategory>>
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
