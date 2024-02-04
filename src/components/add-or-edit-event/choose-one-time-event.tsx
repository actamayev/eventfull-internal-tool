import _ from "lodash"
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
		console.log("newStartDate", newStartDate)

		if (_.isNull(newStartDate)) {
			alert("Start time must be after End time.")
			return // Early return, do not update state
		}

		if (eventDetails.singularEventTime?.endTime !== undefined && newStartDate > eventDetails.singularEventTime.endTime) {
			alert("Start time must be before the end time.")
			return // Early return, do not update state
		}

		// Update event details only if the new start time is valid
		const newEndDate = eventDetails.singularEventTime?.endTime
			? eventDetails.singularEventTime.endTime
			: new Date(newStartDate.getTime() + 60 * 60 * 1000) // Add 1 hour in milliseconds if end time is not defined

		setEventDetails({
			...eventDetails,
			singularEventTime: {
				...eventDetails.singularEventTime,
				startTime: newStartDate,
				endTime: newEndDate,
				eventDuration: calculateEventDuration(newStartDate, newEndDate),
			},
		})
	}


	const handleEndTimeChange = (newEndDate: Date | null) => {
		if (_.isNull(newEndDate)) {
			alert("End time must be after Start time.")
			return
		} else if (eventDetails.singularEventTime?.startTime === undefined) {
			alert("Please choose a start time first.")
			return
		} else {
			if (newEndDate < eventDetails.singularEventTime.startTime) {
				alert("End time must be after the start time.")
				return
			}
			setEventDetails({
				...eventDetails,
				singularEventTime: {
					...eventDetails.singularEventTime,
					endTime: newEndDate,
					eventDuration: calculateEventDuration(eventDetails.singularEventTime.startTime, newEndDate)
				}
			})
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<div className="flex flex-row">
				<div className="mr-2">
					<DateTimePicker
						label="Start Time & Date"
						value={eventDetails.singularEventTime?.startTime || null}
						onChange={handleStartTimeChange}
						minDate={new Date()}
						maxDate={eventDetails.singularEventTime?.endTime || undefined}
					/>
				</div>
				<DateTimePicker
					label="End Time & Date"
					value={eventDetails.singularEventTime?.endTime || null}
					onChange={handleEndTimeChange}
					minDate={eventDetails.singularEventTime?.startTime || new Date()}
				/>
			</div>
		</LocalizationProvider>
	)
}
