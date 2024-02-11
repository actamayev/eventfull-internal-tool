import CharacterLimit from "../character-limit"
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
		<div className="flex items-center justify-between">

			<FormGroup
				label="Event Category Name *"
				type="text"
				placeholder="Entertainment"
				onChange={handleEventCategoryNameChange}
				required
				value={eventCategory.eventCategoryName}
				maxLength={20}
				className="flex-grow mr-4"
			/>
			<div className="shrink-0">
				<CharacterLimit
					variable={eventCategory.eventCategoryName}
					maxLength={20}
				/>
			</div>
		</div>
	)
}
