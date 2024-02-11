import _ from "lodash"
import { useContext } from "react"
import { observer } from "mobx-react"
import AppContext from "../../contexts/eventfull-it-context"
import useRetrieveEventCategories from "../../hooks/events/retrieve/retrieve-event-categories"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

function ChooseExtraEventCategories(props: Props) {
	const { eventDetails, setEventDetails } = props
	const appContext = useContext(AppContext)
	useRetrieveEventCategories()

	if (
		_.isNull(appContext.eventsData) ||
		_.isEmpty(appContext.eventsData.eventCategories)
	) return null

	const selectedEventTypeCategories = appContext.eventsData.eventTypes.get(
		eventDetails.eventType
	)?.categories.map(c => c.categoryId) || []

	const handleExtraCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { options } = e.target
		const updatedExtraCategories: string[] = []

		for (let i = 0; i < options.length; i++) {
			const option = options[i]

			if (option.selected) {
				const category = appContext.eventsData?.eventCategories.get(option.value)
				if (category) updatedExtraCategories.push(option.value)
			}
		}

		setEventDetails({
			...eventDetails,
			extraEventCategories: updatedExtraCategories
		})
	}

	return (
		<div className="mt-1 mb-4">
			<label className="block text-sm font-medium text-gray-700">
				Extra Event Categories
			</label>
			<select
				multiple
				value={eventDetails.extraEventCategories || []}
				onChange={handleExtraCategoryChange}
				className="mt-1 block w-full h-56 py-2 px-3 border border-gray-300 bg-white rounded-md \
					shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-600 sm:text-sm"
			>
				{Array.from(appContext.eventsData.eventCategories.entries()).map(([id, category]) => {
					if (selectedEventTypeCategories.includes(id)) return null // Skip categories already in the event type
					return (
						<option key={id} value={id}>{category.eventCategoryName}</option>
					)
				})}
			</select>
		</div>
	)
}

export default observer(ChooseExtraEventCategories)
