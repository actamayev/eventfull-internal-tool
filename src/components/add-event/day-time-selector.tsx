import calculateEventDuration from "../../utils/events/calculate-event-duration"
import dayjs from "dayjs"

interface Props {
	day: DayOfWeek
	index: number
	eventDetails: CreatingEvent
	setEventDetails: React.Dispatch<React.SetStateAction<CreatingEvent>>
}

export default function DayTimeSelector (props: Props) {
	const { day, eventDetails, setEventDetails, index } = props

	const dayDetails = eventDetails.ongoingEventTimes?.find(d => d.dayOfWeek === day)
	const isEnabled = Boolean(dayDetails)

	const bgColor = index % 2 === 0 ? "bg-gray-100" : "bg-white"

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked
		let updatedEventTimes
		if (checked) {
			// Assuming default eventDuration calculation
			const defaultStartTime = new Date()
			const defaultEndTime = new Date()
			defaultEndTime.setHours(defaultStartTime.getHours() + 8) // example default duration of 8 hours

			updatedEventTimes = [
				...(eventDetails.ongoingEventTimes || []),
				{
					dayOfWeek: day,
					startTime: defaultStartTime,
					endTime: defaultEndTime,
					eventDuration: calculateEventDuration(defaultStartTime, defaultEndTime),
				},
			]
		} else {
			updatedEventTimes = eventDetails.ongoingEventTimes?.filter(d => d.dayOfWeek !== day) || []
		}

		setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
	}

	// TODO: Show an alert if the start time is after the end time
	const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
		// Ensure currentTimes has the correct structure
		const currentTimes: OngoingEvents = {
			...dayDetails,
			dayOfWeek: day,
			startTime: dayDetails?.startTime || new Date("09:00"),
			endTime: dayDetails?.endTime || new Date("17:00"),
			eventDuration: dayDetails?.eventDuration || { hours: 0, minutes: 0 },
		}

		const dateValue = value ? new Date(value) : null
		currentTimes[type] = dateValue

		// Calculate the updated duration
		const updatedDuration = calculateEventDuration(currentTimes.startTime, currentTimes.endTime)
		currentTimes.eventDuration = updatedDuration

		// Update the ongoingEventTimes array
		const updatedEventTimes = eventDetails.ongoingEventTimes?.map(d =>
			d.dayOfWeek === day ? currentTimes : d
		) || []

		setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
	}

	function formatTime(date: Date) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!date) return ""
		return dayjs(date).format("HH:mm")
	}

	return (
		<div className={`grid grid-cols-[auto_minmax(120px,_1fr)_auto_minmax(120px,_1fr)] gap-2 items-center mb-2 p-2 ${bgColor}`}>
			<label className="flex items-center cursor-pointer col-span-1">
				<input
					type="checkbox"
					checked={isEnabled}
					onChange={handleCheckboxChange}
				/>
				<span className="ml-2">{day}</span>
			</label>
			<input
				type="time"
				className="col-span-1"
				disabled={!isEnabled}
				value={isEnabled && dayDetails?.startTime ? formatTime(dayDetails.startTime) : ""}
				onChange={(e) => handleTimeChange("startTime", e.target.value)}
			/>
			<span className="col-span-1 text-center">to</span>
			<input
				type="time"
				className="col-span-1"
				disabled={!isEnabled}
				value={isEnabled && dayDetails?.endTime ? formatTime(dayDetails.endTime) : ""}
				onChange={(e) => handleTimeChange("endTime", e.target.value)}
				min={isEnabled && dayDetails?.startTime ? formatTime(dayDetails.startTime) : ""}
			/>
		</div>
	)
}
