import ChooseOneTimeEvent from "./choose-one-time-event"
import CustomEventDateSelector from "./custom-event-date-selector"
import DayTimeSelector from "./day-time-selector"

interface Props {
	eventDetails: CreatingEvent
	setEventDetails: React.Dispatch<React.SetStateAction<CreatingEvent>>
}

enum DayOfWeekEnum {
	Sunday = "Sunday",
	Monday = "Monday",
	Tuesday = "Tuesday",
	Wednesday = "Wednesday",
	Thursday = "Thursday",
	Friday = "Friday",
	Saturday = "Saturday"
}

export default function SelectTimes(props: Props) {
	const { eventDetails, setEventDetails } = props

	const addCustomEventDate = (newEventDate: BaseEventTime) => {
		setEventDetails(prevDetails => ({
			...prevDetails,
			customEventDates: [...(prevDetails.customEventDates || []), newEventDate]
		}))
	}

	const deleteCustomEventDate = (indexToDelete: number) => {
		setEventDetails((prevDetails) => {
			const updatedCustomEventDates = [...prevDetails.customEventDates || []]
			updatedCustomEventDates.splice(indexToDelete, 1) // Remove the event date at the specified index
			return { ...prevDetails, customEventDates: updatedCustomEventDates }
		})
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
								Start: {date.startTime ? new Date(date.startTime).toISOString() : "Not set"},
								End: {date.endTime ? new Date(date.endTime).toISOString() : "Not set"}
					</div>
				))}
				<CustomEventDateSelector onConfirm={addCustomEventDate} />
			</>
		)
	}
	else return null
}
