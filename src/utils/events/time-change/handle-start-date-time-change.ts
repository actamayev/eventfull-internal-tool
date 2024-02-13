export default function handleStartDateTimeChange(
	newStartDate: Date | null,
	setStartTime: (value: React.SetStateAction<Date | null>) => void
): void {
	if (!newStartDate) return

	const currentDateTime = new Date()

	// Check if the selected date is today
	const isToday = newStartDate.toDateString() === currentDateTime.toDateString()

	if (isToday === false) {
		if (newStartDate.getHours() === 0 && newStartDate.getMinutes() === 0) {
			newStartDate.setHours(9, 0, 0, 0) // Set to 9:00 AM for future dates
		}

	} else {
		// For dates that are not today, ensure the time is set to 9AM if it defaults to 12AM
		if (newStartDate < currentDateTime) {
			const nextHour = currentDateTime.getHours() + 1
			newStartDate.setHours(nextHour, 0, 0, 0) // Set minutes, seconds, and milliseconds to 0
			// Handle the case where adjusting to the next hour would roll over to the next day
			if (nextHour >= 24) {
				newStartDate.setHours(23, 59, 0, 0) // Set to 11:59PM today if the next hour is beyond today
			}
		}
	}

	setStartTime(newStartDate)
}
