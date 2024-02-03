import "../../styles/toggle-styles.css"

interface Props {
	eventDetails: CreatingEvent | EventFromDB;
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void;
}

export default function ToggleVirtualEvent(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleToggle = () => {
		setEventDetails({...eventDetails, isVirtual: !eventDetails.isVirtual})
	}

	return (
		<div>
			Is the Event Virtual?
			<div className="toggle-virtual-event">
				<label className="toggle-pill">
					<input
						type="checkbox"
						checked={eventDetails.isVirtual}
						onChange={handleToggle}
					/>
					<span className="slider round"></span>
				</label>
			</div>
		</div>
	)
}
