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
	const currentDateTime = new Date().toISOString().slice(0, 16)

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
				},
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
				minDate={currentDateTime}
			/>

			<FormGroup
				id="event-end-time"
				label="Event End Time"
				type="datetime-local"
				minDate={
					eventDetails.singularEventTime?.startTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.startTime) : ""
				}
				onChange={handleEndTimeChange}
				required
				value={eventDetails.singularEventTime?.endTime ? formatDateToDateTimeLocal(eventDetails.singularEventTime.endTime) : ""}
			/>
		</>
	)
}
