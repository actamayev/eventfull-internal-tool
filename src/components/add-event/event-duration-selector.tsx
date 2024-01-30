import { useState } from "react"

interface Props {
	onDurationChange: (hours: number, minutes: number) => void
}

export default function EventDurationSelector (props: Props) {
	const { onDurationChange } = props

	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)

	const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newHours = parseInt(e.target.value, 10)
		setHours(newHours)
		onDurationChange(newHours, minutes)
	}

	const handleMinutesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newMinutes = parseInt(e.target.value, 10)
		setMinutes(newMinutes)
		onDurationChange(hours, newMinutes)
	}

	return (
		<div className="flex space-x-4 items-center mt-1 mb-4">
			<div>
				<label htmlFor="hours" className="block text-sm font-medium text-gray-700">Hours:</label>
				<select
					id="hours"
					value={hours}
					onChange={handleHoursChange}
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md \
						shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>
					{Array.from({ length: 7 }, (a, i) => (
						<option key={i} value={i}>{i} hour(s)</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="minutes" className="block text-sm font-medium text-gray-700">Minutes:</label>
				<select
					id="minutes"
					value={minutes}
					onChange={handleMinutesChange}
					className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md \
						shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				>
					{[0, 15, 30, 45].map(min => (
						<option key={min} value={min}>{min} minute(s)</option>
					))}
				</select>
			</div>
		</div>
	)
}
