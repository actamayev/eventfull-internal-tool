import _ from "lodash"

export default function handleTimeChangeOngoingEvent (
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

	const updatedEventTimes = eventDetails.ongoingEventTimes?.map(d =>
		d.dayOfWeek === day ? currentTimes : d
	) || []

	setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
}
