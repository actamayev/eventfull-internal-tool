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
			// Add the day with default start and end times
			updatedEventTimes = [...(eventDetails.ongoingEventTimes || []), { dayOfWeek: day, startTime: "09:00", endTime: "17:00" }]
		} else {
			// Remove the day from the array
			updatedEventTimes = eventDetails.ongoingEventTimes?.filter(d => d.dayOfWeek !== day) || []
		}

		setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
	}

	const handleTimeChange = (type: "startTime" | "endTime", value: string) => {
		// Fallback object for when dayDetails is undefined
		const fallbackDayDetails = { dayOfWeek: day, startTime: "09:00", endTime: "17:00" }

		// Use dayDetails if it exists, otherwise use the fallback object
		const currentTimes = dayDetails || fallbackDayDetails

		// Update the times with the new value
		const updatedTimes = { ...currentTimes, [type]: value }

		// Update the ongoingEventTimes array
		const updatedEventTimes = eventDetails.ongoingEventTimes?.map(d =>
			d.dayOfWeek === day ? updatedTimes : d
		) || []

		setEventDetails({ ...eventDetails, ongoingEventTimes: updatedEventTimes })
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
				value={isEnabled && dayDetails ? dayDetails.startTime : ""}
				onChange={(e) => handleTimeChange("startTime", e.target.value)}
			/>
			<span className="col-span-1 text-center">to</span>
			<input
				type="time"
				className="col-span-1"
				disabled={!isEnabled}
				value={isEnabled && dayDetails ? dayDetails.endTime : ""}
				onChange={(e) => handleTimeChange("endTime", e.target.value)}
			/>
		</div>
	)
}
