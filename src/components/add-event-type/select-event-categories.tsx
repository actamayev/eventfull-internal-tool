import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../../contexts/eventfull-it-context"

interface Props {
	eventType: CreatingEventType | EventTypeFromDB
	setEventType: (newTypeDetails: Partial<CreatingEventType | EventTypeFromDB>) => void
}

function SelectEventCategories(props: Props) {
	const appContext = useContext(AppContext)
	const { eventType, setEventType } = props

	if (_.isNull(appContext.eventsData)) return null

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = e.target.value
		const selectedCategory = appContext.eventsData?.eventCategories.get(selectedId)

		if (selectedCategory && !eventType.categories.some(cat => cat.categoryId === selectedId)) {
			const updatedCategories = [...eventType.categories, {
				categoryId: selectedId,
				eventCategoryName: selectedCategory.eventCategoryName,
				description: selectedCategory.description,
			}]
			setEventType({ ...eventType, categories: updatedCategories })
		}
	}

	const handleRemoveCategory = (categoryId: string) => {
		const updatedCategories = eventType.categories.filter(cat => cat.categoryId !== categoryId)
		setEventType({ ...eventType, categories: updatedCategories })
	}

	return (
		<>
			<select id="event-category" onChange={handleCategoryChange} value="">
				<option value="">Select a category</option>
				{Array.from(appContext.eventsData.eventCategories.entries()).map(([key, value]) => {
					if (!eventType.categories.some(cat => cat.categoryId === key)) {
						return <option key={key} value={key}>{value.eventCategoryName}</option>
					}
					return null
				})}
			</select>
			<ul>
				{eventType.categories.map(category => (
					<li key={category.categoryId}>
						{category.eventCategoryName} <button onClick={() => handleRemoveCategory(category.categoryId)}>X</button>
					</li>
				))}
			</ul>
		</>
	)
}

export default observer(SelectEventCategories)
