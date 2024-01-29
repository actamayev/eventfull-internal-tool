import { useLoadScript } from "@react-google-maps/api"
import Sidebar from "../components/sidebar"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import AddressInput from "../components/add-event/address-input"

const libraries: ("places")[] = ["places"]

export default function AddEvent() {
	useRedirectUnknownUser()
	console.log(process.env.REACT_APP_GOOGLE_API_KEY)

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	if (!isLoaded) return <div>Loading...</div>

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-grow">
				<div className="mx-auto w-full max-w-md">
					<h1>Add Event</h1>
					<AddressInput />
				</div>
			</div>
		</div>
	)
}
