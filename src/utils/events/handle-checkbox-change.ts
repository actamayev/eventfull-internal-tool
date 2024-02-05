export default function handleCheckboxChange (
	event: React.ChangeEvent<HTMLInputElement>,
	eventDetails: CreatingEvent | EventFromDB,
	day: DayOfWeek,
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
): void {
	const checked = event.target.checked
	let updatedEventTimes
	if (checked === false) {
		updatedEventTimes = eventDetails.ongoingEventTimes?.filter(d => d.dayOfWeek !== day) || []
	} else {
		const defaultStartTime = new Date()
		defaultStartTime.setHours(0, 0, 0, 0) // Reset to start of the day

		const defaultEndTime = new Date(defaultStartTime.getTime() + (8 * 60 * 60 * 1000)) // Add 8 hours in milliseconds

		updatedEventTimes = [
			...(eventDetails.ongoingEventTimes || []),
			{
				dayOfWeek: day,
				startTime: defaultStartTime,
				endTime: defaultEndTime,
			}
		]
	}

	setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
}
