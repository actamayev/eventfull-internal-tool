import { useState } from "react"
import calculateEventDuration from "../../utils/events/calculate-event-duration"

interface Props {
	onConfirm: (newEventDate: BaseEventTime) => void
}

export default function CustomEventDateSelector(props: Props) {
	const { onConfirm } = props

	const [startTime, setStartTime] = useState("")
	const [endTime, setEndTime] = useState("")

	const handleConfirm = () => {
		if (startTime && endTime && new Date(endTime) > new Date(startTime)) {
			onConfirm({
				startTime: new Date(startTime),
				endTime: new Date(endTime),
				eventDuration: calculateEventDuration(new Date(startTime), new Date(endTime))
			})
			setStartTime("")
			setEndTime("")
		} else {
			alert("End time must be after the start time.")
		}
	}

	// TODO: Make it only possible to select times in the future. change in one off event too
	return (
		<>
			<input
				type="datetime-local"
				value={startTime}
				onChange={e => setStartTime(e.target.value)}
			/>
			<input
				type="datetime-local"
				value={endTime}
				onChange={e => setEndTime(e.target.value)}
				min={startTime}
			/>
			<button
				onClick={handleConfirm}
				type="button"
			>
				Confirm
			</button>
		</>
	)
}
