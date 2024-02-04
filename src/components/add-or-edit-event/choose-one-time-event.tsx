import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import calculateEventDuration from "../../utils/events/calculate-event-duration"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function ChooseOneTimeEvent(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleStartTimeChange = (newStartDate: Date | null) => {
		const endTime = new Date()

		if (!newStartDate || newStartDate > endTime) {
			alert("Start time must be after End time.")
			return
		}
		setEventDetails({
			...eventDetails,
			singularEventTime: {
				...eventDetails.singularEventTime,
				startTime: newStartDate,
				endTime: endTime,  // Use the ensured endTime
				eventDuration: calculateEventDuration(newStartDate, endTime),
			},
		})
	}

	const handleEndTimeChange = (newEndDate: Date | null) => {
		// const newEndTime = e.target.value ? new Date(e.target.value) : null
		const startTime = eventDetails.singularEventTime?.startTime !== undefined
			? eventDetails.singularEventTime.startTime
			: null

		if (!newEndDate || !startTime || newEndDate > startTime) {
			alert("End time must be after the start time.")
			return
		}
		setEventDetails({
			...eventDetails,
			singularEventTime: {
				...eventDetails.singularEventTime,
				startTime: startTime, // startTime is now guaranteed to be Date or null
				endTime: newEndDate,
				eventDuration: calculateEventDuration(startTime, newEndDate)
			}
		})
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DateTimePicker
				label="Start Time & Date"
				value={eventDetails.singularEventTime?.startTime}
				onChange={handleStartTimeChange}
			/>
			<DateTimePicker
				label="End Time & Date"
				value={eventDetails.singularEventTime?.endTime || null}
				onChange={handleEndTimeChange}
			/>
		</LocalizationProvider>
	)
}
