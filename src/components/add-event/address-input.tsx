import _ from "lodash"
import { useEffect, useRef } from "react"
import { Autocomplete } from "@react-google-maps/api"
import FormGroup from "../form-group"

interface Props {
	eventDetails: CreatingEvent,
	setEventDetails: React.Dispatch<React.SetStateAction<CreatingEvent>>,
}

function AddressInput(props: Props) {
	const { eventDetails, setEventDetails } = props
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

	useEffect(() => {
		if (!autocompleteRef.current) return

		const listener = autocompleteRef.current.addListener("place_changed", () => {
			const place = autocompleteRef.current?.getPlace()
			if (!_.isUndefined(place)) {
				if (!place.formatted_address) return
				setEventDetails({...eventDetails, address: place.formatted_address})
				// You can get more data from 'place' object like coordinates
			}
		})

		return () => {
			listener.remove()
		}
	}, [])

	return (
		<Autocomplete
			onLoad={(autocomplete) => {
				autocompleteRef.current = autocomplete
			}}
		>
			<FormGroup
				id="address"
				label="Address"
				type="text"
				placeholder="Bowser's Castle"
				value={eventDetails.address}
				onChange={(e) => setEventDetails({...eventDetails, address: e.target.value})}
				required

			/>
		</Autocomplete>
	)
}

export default AddressInput
