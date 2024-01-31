import calculateEventDuration from "../../utils/events/calculate-event-duration"
import formatDateToDateTimeLocal from "../../utils/events/format-date-to-date-time-local"
import FormGroup from "../form-group"

interface Props {
	eventDetails: CreatingEvent
	setEventDetails: React.Dispatch<React.SetStateAction<CreatingEvent>>
}

export default function ChooseOneTimeEvent(props: Props) {
	const { eventDetails, setEventDetails } = props

	if (eventDetails.eventFrequency !== "one-time") return null

	return (
		<>
			<FormGroup
				id="event-start-time"
				label="Event Start Time"
				type="datetime-local"
				onChange={(e) => {
					const newStartTime = e.target.value ? new Date(e.target.value) : null

					// Ensure endTime is either a Date or null, but not undefined
					const endTime = eventDetails.singularEventTime?.endTime !== undefined
						? eventDetails.singularEventTime.endTime
						: null

					setEventDetails({
						...eventDetails,
						singularEventTime: {
							...eventDetails.singularEventTime,
							startTime: newStartTime,
							endTime: endTime,  // Use the ensured endTime
							eventDuration: calculateEventDuration(newStartTime, endTime),
						},
					})
				}}
				required
				value={eventDetails.singularEventTime?.startTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.startTime) : ""}
			/>

			{/* TODO: The min time doesn't work for same day events. Ie if my min time is April 5, 10AM, i can still select April 5, 9AM */}
			<FormGroup
				id="event-end-time"
				label="Event End Time"
				type="datetime-local"
				minDate={
					eventDetails.singularEventTime?.startTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.startTime) : ""
				}
				onChange={(e) => {
					const newEndTime = e.target.value ? new Date(e.target.value) : null

					// Ensure endTime is either a Date or null, but not undefined
					const startTime = eventDetails.singularEventTime?.startTime !== undefined
						? eventDetails.singularEventTime.startTime
						: null

					setEventDetails({
						...eventDetails,
						singularEventTime: {
							...eventDetails.singularEventTime,
							startTime: startTime,  // Use the ensured startTime
							endTime: newEndTime,
							// Calculate eventDuration based on existing startTime and newEndTime
							eventDuration: calculateEventDuration(startTime, newEndTime)
						}
					})
				}}
				required
				value={eventDetails.singularEventTime?.endTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.endTime) : ""}
			/>
		</>
	)
}
