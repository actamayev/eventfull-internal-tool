import dayjs from "dayjs"
import calculateEventDuration from "../../utils/events/calculate-event-duration"

interface Props {
	day: DayOfWeek
	index: number
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

// eslint-disable-next-line max-lines-per-function
export default function DayTimeSelector (props: Props) {
	const { day, eventDetails, setEventDetails, index } = props

	const dayDetails = eventDetails.ongoingEventTimes?.find(d => d.dayOfWeek === day)
	const isEnabled = Boolean(dayDetails)

	const bgColor = index % 2 === 0 ? "bg-gray-100" : "bg-white"

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checked = event.target.checked
		let updatedEventTimes
		if (checked === false) {
			updatedEventTimes = eventDetails.ongoingEventTimes?.filter(d => d.dayOfWeek !== day) || []
		} else {
			const defaultStartTime = new Date()
			defaultStartTime.setMinutes(0, 0, 0) // Reset minutes, seconds, and milliseconds

			// Default end time is 8 hours from the start time, but not past midnight
			const defaultEndTime = new Date(defaultStartTime.getTime() + (8 * 60 * 60 * 1000)) // Add 8 hours in milliseconds

			// Check if default end time crosses to the next day
			if (defaultEndTime.getDate() !== defaultStartTime.getDate()) {
				defaultEndTime.setHours(23, 59, 59, 999) // Set to the end of the start day
				defaultEndTime.setDate(defaultStartTime.getDate()) // Ensure it's the same day
			}

			updatedEventTimes = [
				...(eventDetails.ongoingEventTimes || []),
				{
					dayOfWeek: day,
					startTime: defaultStartTime,
					endTime: defaultEndTime,
					eventDuration: calculateEventDuration(defaultStartTime, defaultEndTime)
				}
			]
		}

		setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
	}

	// change to this day picker: https://retool.com/blog/how-to-create-a-time-picker-in-react
	const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
		// Ensure currentTimes has the correct structure
		const defaultStartTime = new Date()
		defaultStartTime.setHours(9, 0, 0, 0) // Set time to 09:00 AM

		const defaultEndTime = new Date()
		defaultEndTime.setHours(17, 0, 0, 0) // Set time to 05:00 PM

		const currentTimes: OngoingEvents = {
			...dayDetails,
			dayOfWeek: day,
			startTime: dayDetails?.startTime || defaultStartTime,
			endTime: dayDetails?.endTime || defaultEndTime,
			eventDuration: dayDetails?.eventDuration || { hours: 0, minutes: 0 },
		}

		const timeValue = new Date(currentTimes[type])
		timeValue.setHours(parseInt(value.split(":")[0]), parseInt(value.split(":")[1]))

		// Temporarily update the current time to check if it's valid
		currentTimes[type] = timeValue

		// Check if the start time is after the end time
		if (currentTimes.startTime > currentTimes.endTime) {
			alert("Start time cannot be after end time.")
			return // Exit the function without updating the state
		}

		// Check if the end time is before the start time
		if (currentTimes.endTime < currentTimes.startTime) {
			alert("End time cannot be before start time.")
			return // Exit the function without updating the state
		}

		// If times are valid, calculate the updated duration and update the state
		const updatedDuration = calculateEventDuration(currentTimes.startTime, currentTimes.endTime)
		currentTimes.eventDuration = updatedDuration

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
