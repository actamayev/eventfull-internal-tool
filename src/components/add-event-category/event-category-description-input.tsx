import CharacterLimit from "../character-limit"
import FormGroup from "../form-group"

interface Props {
	eventCategory: CreatingEventCategory | EventCategoryFromDB
	setEventCategory: (newCategoryDetails: Partial<CreatingEventCategory | EventCategoryFromDB>) => void
}

export default function EventCategoryDescriptionInput(props: Props) {
	const { eventCategory, setEventCategory } = props

	const handleEventCategoryDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventCategory({...eventCategory, description: e.target.value})
	}

	return (
		<div className="flex items-center justify-between">

			<FormGroup
				label="Event Category Description *"
				type="text"
				placeholder="Events focused on entertaining attendees through various forms of media"
				onChange={handleEventCategoryDescriptionChange}
				required
				value={eventCategory.description}
				maxLength={100}
				className="flex-grow mr-4"
			/>
			<div className="shrink-0">
				<CharacterLimit
					variable={eventCategory.description}
					maxLength={100}
				/>
			</div>
		</div>
	)
}
