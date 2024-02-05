import "../../styles/toggle-styles.css"

interface Props {
	eventDetails: CreatingEvent | EventFromDB;
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void;
}

export default function TogglePublicEvent(props: Props) {
	const { eventDetails, setEventDetails } = props

	const handleToggle = () => {
		setEventDetails({...eventDetails, eventPublic: !eventDetails.eventPublic})
	}

	return (
		<div>
			Is the Event Public?
			<div className="toggle-virtual-event">
				<label className="toggle-pill">
					<input
						type="checkbox"
						checked={eventDetails.eventPublic}
						onChange={handleToggle}
					/>
					<span className="slider round"></span>
				</label>
			</div>
		</div>
	)
}
