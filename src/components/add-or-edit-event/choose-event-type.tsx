import eventTypes from "../../utils/event-types"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function ChooseEventType(props: Props) {
	const { eventDetails, setEventDetails } = props

	return (
		<div className="mt-1 mb-4">
			<select
				value={eventDetails.eventType}
				onChange={(e) => setEventDetails({...eventDetails, eventType: e.target.value})}
				className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm \
					focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option value="">Select Event Category</option>
				{eventTypes.map(category => (
					<option key={category} value={category}>{category}</option>
				))}
			</select>
		</div>
	)
}
