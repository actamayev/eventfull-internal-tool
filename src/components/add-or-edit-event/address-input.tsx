import { useEffect, useRef } from "react"
import { Autocomplete } from "@react-google-maps/api"
import FormGroup from "../form-group"
import CharacterLimit from "../character-limit"

interface Props {
	eventDetails: CreatingEvent | EventFromDB
	setEventDetails: (newEventDetails: Partial<CreatingEvent | EventFromDB>) => void
}

export default function AddressInput(props: Props) {
	const { eventDetails, setEventDetails } = props
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

	useEffect(() => {
		if (!autocompleteRef.current) return

		const listener = autocompleteRef.current.addListener("place_changed", () => {
			const place = autocompleteRef.current?.getPlace()
			if (place && place.formatted_address) {
				setEventDetails({...eventDetails, address: place.formatted_address})
			}
		})

		return () => {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (listener) listener.remove()
		}
	}, [setEventDetails, eventDetails])  // Add dependencies here

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEventDetails({...eventDetails, address: e.target.value})
	}

	return (
		<Autocomplete
			onLoad={(autocomplete) => {
				autocompleteRef.current = autocomplete
			}}
		>
			<div className="flex items-center justify-between">
				<FormGroup
					label="Address *"
					type="text"
					placeholder="Bowser's Castle"
					value={eventDetails.address}
					onChange={handleAddressChange}
					required
					maxLength={100}
					className="flex-grow mr-4"
				/>
				<div className="shrink-0">
					<CharacterLimit
						variable={eventDetails.address}
						maxLength={100}
					/>
				</div>
			</div>
		</Autocomplete>
	)
}
