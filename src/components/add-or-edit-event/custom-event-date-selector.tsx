import { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import Button from "../button"
import calculateEventDuration from "../../utils/events/calculate-event-duration"

interface Props {
	onConfirm: (newEventDate: BaseEventTime) => void
}

export default function CustomEventDateSelector(props: Props) {
	const { onConfirm } = props

	const [startTime, setStartTime] = useState<Date | null>(null)
	const [endTime, setEndTime] = useState<Date | null>(null)
	const currentDateTime = new Date()

	const handleConfirm = () => {
		if (!startTime || !endTime) {
			alert("Please select a start and end time.")
		} else if (endTime <= startTime) {
			alert("End time must be after the start time.")
		} else {
			onConfirm({
				startTime: new Date(startTime),
				endTime: new Date(endTime),
				eventDuration: calculateEventDuration(new Date(startTime), new Date(endTime))
			})
			setStartTime(null)
			setEndTime(null)
		}
	}

	return (
		<div className="flex">
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateTimePicker
					label="Start Time & Date"
					value={startTime}
					onChange={setStartTime}
					minDate={currentDateTime}
				/>
				<DateTimePicker
					label="End Time & Date"
					value={endTime}
					onChange={setEndTime}
					minDate={startTime || currentDateTime}
				/>
			</LocalizationProvider>
			<div className="mt-2">
				<Button
					title="Confirm"
					onClick={handleConfirm}
					colorClass="bg-blue-300"
					hoverClass="hover:bg-blue-400"
				/>
			</div>
		</div>
	)
}
