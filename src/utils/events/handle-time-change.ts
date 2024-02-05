import _ from "lodash"

// Handle time change for ongoing events
export default function handleTimeChange (
	type: "startTime" | "endTime",
	value: Date | null,
	dayDetails: OngoingEvents | undefined,
	day: DayOfWeek,
	eventDetails: CreatingEvent | EventFromDB,
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
): void {
	if (_.isNull(value)) return

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
	}

	const timeValue = new Date(currentTimes[type])
	timeValue.setHours(value.getHours(), value.getMinutes())

	currentTimes[type] = timeValue

	if (currentTimes.startTime > currentTimes.endTime) {
		alert("Start time cannot be after end time.")
		return
	}

	if (currentTimes.endTime < currentTimes.startTime) {
		alert("End time cannot be before start time.")
		return
	}

	const updatedEventTimes = eventDetails.ongoingEventTimes?.map(d =>
		d.dayOfWeek === day ? currentTimes : d
	) || []

	setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
}
