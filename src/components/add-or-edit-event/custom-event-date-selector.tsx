import { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import Button from "../button"
import handleStartDateTimeChange from "../../utils/events/time-change/handle-start-date-time-change"

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
			})
			setStartTime(null)
			setEndTime(null)
		}
	}

	return (
		<div className="flex">
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<div className="flex flex-row">
					<DateTimePicker
						label="Start Time & Date"
						value={startTime}
						onChange={(e) => handleStartDateTimeChange(e, setStartTime)}
						minDate={currentDateTime}
					/>
					<div className="mx-2">
						<DateTimePicker
							label="End Time & Date"
							value={endTime}
							onChange={setEndTime}
							minDate={startTime || currentDateTime}
						/>
					</div>
				</div>
			</LocalizationProvider>
			<div className="mt-2">
				<Button
					title="Confirm"
					onClick={handleConfirm}
					disabled={!startTime || !endTime || startTime >= endTime}
					colorClass="bg-blue-500"
					hoverClass="hover:bg-blue-600"
					className="text-white font-semibold"
				/>
			</div>
		</div>
	)
}
