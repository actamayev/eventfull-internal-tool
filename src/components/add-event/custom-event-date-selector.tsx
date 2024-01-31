import { useState } from "react"
import calculateEventDuration from "../../utils/events/calculate-event-duration"
import Button from "../button"
import FormGroup from "../form-group"

interface Props {
	onConfirm: (newEventDate: BaseEventTime) => void
}

export default function CustomEventDateSelector(props: Props) {
	const { onConfirm } = props

	const [startTime, setStartTime] = useState("")
	const [endTime, setEndTime] = useState("")
	const currentDateTime = new Date().toISOString().slice(0, 16)

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

	return (
		<div className="flex">
			<div className="mr-2">
				<FormGroup
					id="event-start-time"
					label="Event Start Time"
					type="datetime-local"
					onChange={e => setStartTime(e.target.value)}
					value={startTime}
					minDate={currentDateTime}
				/>
			</div>
			<div className="mr-2">
				<FormGroup
					id="event-end-time"
					label="Event End Time"
					type="datetime-local"
					onChange={e => setEndTime(e.target.value)}
					value={endTime}
					minDate={startTime}
				/>
			</div>
			<div className="mt-7">
				<Button
					title="Confirm"
					onClick={handleConfirm}
					colorClass="bg-blue-300"
					hoverClass="hover:bg-blue-400"
				/>
			</div>
		</div>
	)
}
