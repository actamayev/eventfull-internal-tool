interface Props {
	eventDetails: CreatingEvent
	setEventDetails: React.Dispatch<React.SetStateAction<CreatingEvent>>
}

export default function SelectEventFrequency(props: Props) {
	const { eventDetails, setEventDetails } = props

	return (
		<div className="mt-1 mb-4">

			<select
				value={eventDetails.eventFrequency}
				onChange={(e) => setEventDetails({...eventDetails, eventFrequency: e.target.value as EventFrequency})}
				className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white \
				rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			>
				<option value="">Select Event Frequency</option>
				<option value="one-time">One-time</option>
				<option value="ongoing">Ongoing</option>
				<option value="custom">Custom</option>
			</select>

		</div>
	)
}
