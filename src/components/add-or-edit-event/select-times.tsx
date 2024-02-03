import DayTimeSelector from "./day-time-selector"
import ChooseOneTimeEvent from "./choose-one-time-event"
import DayOfWeekEnum from "../../types/day-of-week-enum"
import CustomEventDateSelector from "./custom-event-date-selector"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function SelectTimes(props: Props) {
	const { eventDetails, setEventDetails } = props

	const deleteCustomEventDate = (indexToDelete: number) => {
		const updatedCustomEventDates = eventDetails.customEventDates
			? [...eventDetails.customEventDates]
			: []

		if (updatedCustomEventDates.length > 0) {
			updatedCustomEventDates.splice(indexToDelete, 1) // Remove the event date at the specified index
			setEventDetails({ customEventDates: updatedCustomEventDates })
		}
	}

	const addCustomEventDate = (newEventDate: BaseEventTime) => {
		// Directly creating the new state object
		const updatedCustomEventDates = [
			...(eventDetails.customEventDates || []),
			newEventDate
		]

		// Pass the new state object to setEventDetails
		setEventDetails({ customEventDates: updatedCustomEventDates })
	}

	if (eventDetails.eventFrequency === "one-time") {
		return (
			<ChooseOneTimeEvent
				eventDetails={eventDetails}
				setEventDetails={setEventDetails}
			/>
		)
	} else if (eventDetails.eventFrequency === "ongoing") {
		return (
			<>
				{Object.values(DayOfWeekEnum).map((day, index) => (
					<DayTimeSelector
						key={day}
						day={day}
						index={index}
						eventDetails={eventDetails}
						setEventDetails={setEventDetails}
					/>
				))}
			</>
		)
	} else if (eventDetails.eventFrequency === "custom") {
		return (
			<>
				{eventDetails.customEventDates && eventDetails.customEventDates.map((date, index) => (
					<div key={index}>
						<button
							onClick={() => deleteCustomEventDate(index)}
							type="button"
						>
							Delete
						</button>
							Start: {new Date(date.startTime).toISOString()},
							End: {new Date(date.endTime).toISOString()}
					</div>
				))}
				<CustomEventDateSelector onConfirm={addCustomEventDate} />
			</>
		)
	}
	else return null
}
