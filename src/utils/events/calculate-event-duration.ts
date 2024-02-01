import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

export default function calculateEventDuration(
	startTime: Date | null,
	endTime: Date | null
): {
	hours: number
	minutes: number
} {
	if (!startTime || !endTime) {
		return { hours: 0, minutes: 0 }
	}

	// TODO: Fix the duration not being corect for events that span multiple days

	const start = dayjs(startTime)
	const end = dayjs(endTime)
	const eventDuration = end.diff(start)

	const hours = dayjs.duration(eventDuration).hours()
	const minutes = dayjs.duration(eventDuration).minutes()

	return { hours, minutes }
}
