import { useEffect, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import handleStartDateTimeChange from "../../utils/events/time-change/handle-start-date-time-change"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function ChooseOneTimeEvent(props: Props) {
	const { eventDetails, setEventDetails } = props
	const [startTime, setStartTime] = useState<Date | null>(eventDetails.singularEventTime?.startTime || null)
	const [endTime, setEndTime] = useState<Date | null>(eventDetails.singularEventTime?.endTime || null)

	useEffect(() => {
		if (!startTime || !endTime) return
		setEventDetails({
			...eventDetails,
			singularEventTime: {
				startTime,
				endTime,
			}
		})
	}, [startTime, endTime])

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<div className="flex flex-row">
				<div className="mr-2">
					<DateTimePicker
						label="Start Time & Date"
						value={eventDetails.singularEventTime?.startTime || null}
						onChange={(e) => handleStartDateTimeChange(e, setStartTime)}
						minDate={new Date()}
						maxDate={eventDetails.singularEventTime?.endTime || undefined}
					/>
				</div>
				<DateTimePicker
					label="End Time & Date"
					value={eventDetails.singularEventTime?.endTime || null}
					onChange={setEndTime}
					minDate={startTime || eventDetails.singularEventTime?.startTime || new Date()}
				/>
			</div>
		</LocalizationProvider>
	)
}
