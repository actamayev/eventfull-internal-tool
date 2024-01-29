import _ from "lodash"
import { useState, useEffect, useRef } from "react"
import { Autocomplete } from "@react-google-maps/api"

function AddressInput() {
	const [address, setAddress] = useState("")
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

	useEffect(() => {
		if (!autocompleteRef.current) return

		const listener = autocompleteRef.current.addListener("place_changed", () => {
			const place = autocompleteRef.current?.getPlace()
			if (!_.isUndefined(place)) {
				if (!place.formatted_address) return
				setAddress(place.formatted_address)
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
			<input
				type="text"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				placeholder="Enter your address"
			/>
		</Autocomplete>
	)
}

export default AddressInput
