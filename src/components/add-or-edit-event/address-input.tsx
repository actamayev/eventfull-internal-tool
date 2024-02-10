import { useEffect, useRef } from "react"
import { Autocomplete } from "@react-google-maps/api"
import FormGroup from "../form-group"

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
			<FormGroup
				label="Address *"
				type="text"
				placeholder="Bowser's Castle"
				value={eventDetails.address}
				onChange={handleAddressChange}
				required
			/>
		</Autocomplete>
	)
}
