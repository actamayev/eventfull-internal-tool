import FormGroup from "../form-group"
import calculateEventDuration from "../../utils/events/calculate-event-duration"
import formatDateToDateTimeLocal from "../../utils/events/format-date-to-date-time-local"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function ChooseOneTimeEvent(props: Props) {
	const { eventDetails, setEventDetails } = props

	const currentDateTime = formatDateToDateTimeLocal(new Date())

	const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newStartTime = new Date(e.target.value)

		let endTime
		if (eventDetails.singularEventTime?.endTime) {
			endTime = new Date(eventDetails.singularEventTime.endTime)
		} else {
			// Set endTime to 3 hours after newStartTime
			endTime = new Date(newStartTime.getTime() + 3 * 60 * 60 * 1000) // 3 hours in milliseconds
		}

		if (newStartTime > endTime) {
			alert("Start time must be after End time.")
			// eslint-disable-next-line max-len
			e.target.value = eventDetails.singularEventTime?.startTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.startTime) : ""
		} else {
			setEventDetails({
				...eventDetails,
				singularEventTime: {
					...eventDetails.singularEventTime,
					startTime: newStartTime,
					endTime: endTime,  // Use the ensured endTime
					eventDuration: calculateEventDuration(newStartTime, endTime),
				},
			})
		}
	}

	const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEndTime = e.target.value ? new Date(e.target.value) : null
		const startTime = eventDetails.singularEventTime?.startTime !== undefined
			? eventDetails.singularEventTime.startTime
			: null

		if (newEndTime && startTime && newEndTime > startTime) {
			// Valid end time, update the state
			setEventDetails({
				...eventDetails,
				singularEventTime: {
					...eventDetails.singularEventTime,
					startTime: startTime, // startTime is now guaranteed to be Date or null
					endTime: newEndTime,
					eventDuration: calculateEventDuration(startTime, newEndTime)
				}
			})
		} else {
			// Invalid end time, show an error or revert to a valid value
			alert("End time must be after the start time.")
			// eslint-disable-next-line max-len
			e.target.value = eventDetails.singularEventTime?.endTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.endTime) : ""
		}
	}

	return (
		<>
			<FormGroup
				id="event-start-time"
				label="Event Start Time"
				type="datetime-local"
				onChange={handleStartTimeChange}
				required
				value={eventDetails.singularEventTime?.startTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.startTime) : ""}
				minDate={currentDateTime}
			/>

			<FormGroup
				id="event-end-time"
				label="Event End Time"
				type="datetime-local"
				onChange={handleEndTimeChange}
				required
				value={eventDetails.singularEventTime?.endTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.endTime) : ""}
				minDate={
					eventDetails.singularEventTime?.startTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.startTime) :
						currentDateTime
				}
			/>
		</>
	)
}
