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
		<div className="flex space-x-2">
			<div>
				<label>Hours: </label>
				<select value={hours} onChange={handleHoursChange}>
					{Array.from({ length: 7 }, (a, i) => (
						<option key={i} value={i}>{i} hour(s)</option>
					))}
				</select>
			</div>
			<div>
				<label>Minutes: </label>
				<select value={minutes} onChange={handleMinutesChange}>
					{[0, 15, 30, 45].map(min => (
						<option key={min} value={min}>{min} minute(s)</option>
					))}
				</select>
			</div>
		</div>
	)
}
