export default function formatDateToDateTimeLocal(date: Date): string {
	if (!(date instanceof Date)) {
		date = new Date(date)
	}
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const ten = (i: number) => (i < 10 ? "0" : "") + i
	const year = date.getFullYear()
	const month = ten(date.getMonth() + 1)
	const day = ten(date.getDate())
	const hour = ten(date.getHours())
	const mm = ten(date.getMinutes())

	return `${year}-${month}-${day}T${hour}:${mm}`
}
