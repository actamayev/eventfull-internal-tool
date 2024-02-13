import { LocalizationProvider } from "@mui/x-date-pickers"
import { TimePicker }  from "@mui/x-date-pickers/TimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import handleCheckboxChange from "../../utils/events/handle-checkbox-change"
import handleTimeChangeOngoingEventOngoingEvent from "../../utils/events/time-change/handle-time-change-ongoing-event"

interface Props {
	day: DayOfWeek
	index: number
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function OngoingDayTimeSelector (props: Props) {
	const { day, eventDetails, setEventDetails, index } = props

	const dayDetails = eventDetails.ongoingEventTimes?.find(d => d.dayOfWeek === day)
	const isEnabled = Boolean(dayDetails)

	const bgColor = index % 2 === 0 ? "bg-gray-100" : "bg-white"

	return (
		<div className={`grid grid-cols-[auto_minmax(120px,_1fr)_auto_minmax(120px,_1fr)] gap-2 items-center mb-2 p-2 ${bgColor}`}>
			<label className="flex items-center cursor-pointer col-span-1">
				<input
					type="checkbox"
					checked={isEnabled}
					onChange={(e) => handleCheckboxChange(e, eventDetails, day, setEventDetails)}
				/>
				<span className="ml-2">{day}</span>
			</label>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<TimePicker
					label="Start Time"
					value={dayDetails?.startTime}
					disabled={!isEnabled}
					onChange={(e) => {
						handleTimeChangeOngoingEventOngoingEvent("startTime", e, dayDetails, day, eventDetails, setEventDetails)
					}}
				/>
				<TimePicker
					label="End Time"
					value={dayDetails?.endTime}
					disabled={!isEnabled}
					onChange={(e) => handleTimeChangeOngoingEventOngoingEvent("endTime", e, dayDetails, day, eventDetails, setEventDetails)}
					minTime={dayDetails?.startTime}
				/>
			</LocalizationProvider>
		</div>
	)
}
