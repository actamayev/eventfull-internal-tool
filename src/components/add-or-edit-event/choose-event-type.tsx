import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import AppContext from "../../contexts/eventfull-it-context"
import useRetrieveEventTypes from "../../hooks/events/retrieve-event-types"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

function ChooseEventType(props: Props) {
	const { eventDetails, setEventDetails } = props
	const appContext = useContext(AppContext)
	useRetrieveEventTypes()

	if (
		_.isNull(appContext.eventsData) ||
		_.isEmpty(appContext.eventsData.eventTypes)
	) return null

	return (
		<div className="mt-1 mb-4">
			<select
				value={eventDetails.eventType}
				onChange={(e) => setEventDetails({...eventDetails, eventType: e.target.value})}
				className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm \
					focus:outline-none focus:ring-indigo-500 focus:border-indigo-600 sm:text-sm"
			>
				<option value="">Select Event Type</option>
				{Array.from(appContext.eventsData.eventTypes).map(([name, eventType]) => (
					<option key={name} value={name}>{name}</option>
				))}
			</select>
		</div>
	)
}

export default observer(ChooseEventType)
