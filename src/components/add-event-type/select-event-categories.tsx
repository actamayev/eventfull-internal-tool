import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../../contexts/eventfull-it-context"

interface Props {
	eventType: CreatingEventType
	setEventType: React.Dispatch<React.SetStateAction<CreatingEventType>>
}

function SelectEventCategories(props: Props) {
	const appContext = useContext(AppContext)
	const { eventType, setEventType } = props

	if (_.isNull(appContext.eventsData)) return null

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = e.target.value
		const selectedCategory = appContext.eventsData?.eventCategories.get(selectedId)

		if (!_.isUndefined(selectedCategory)) {
			const updatedCategories = [...eventType.categories, {
				categoryId: selectedId,
				eventCategoryName: selectedCategory.eventCategoryName,
			}]

			setEventType({ ...eventType, categories: updatedCategories })
		}
	}

	return (
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
	)
}

export default observer(SelectEventCategories)
