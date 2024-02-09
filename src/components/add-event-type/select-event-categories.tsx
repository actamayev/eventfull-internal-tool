import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import FormGroup from "../form-group"
import AppContext from "../../contexts/eventfull-it-context"

interface Props {
	eventType: CreatingEventType
	setEventType: React.Dispatch<React.SetStateAction<CreatingEventType>>
}

function SelectEventCategories(props: Props) {
	const appContext = useContext(AppContext)
	const { eventType, setEventType } = props

	const handleEventTypeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventType({...eventType, description: e.target.value})
	}


	if (_.isNull(appContext.eventsData)) return null

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = e.target.value
		const selectedCategory = appContext.eventsData?.eventCategories.get(selectedId)

		if (selectedCategory) {
			const updatedCategories = [...eventType.categories, {
				_id: selectedId,
				eventCategoryName: selectedCategory.eventCategoryName,
			}]

			setEventType({ ...eventType, categories: updatedCategories })
		}
	}
	console.log(appContext.eventsData.eventCategories)

	return (
		<>
			<FormGroup
				id="type-description"
				label="Description *"
				type="text"
				placeholder="A competetive basketball match."
				onChange={handleEventTypeNameChange}
				required
				value={eventType.description}
			/>
			<select
				id="event-category"
				onChange={handleCategoryChange}
				required
			>
				<option value="">Select a category</option>
				{Array.from(appContext.eventsData.eventCategories.entries()).map(([key, value]) => (
					<option key={key} value={key}>{value.eventCategoryName}</option>
				))}
			</select>
		</>
	)
}

export default observer(SelectEventCategories)
