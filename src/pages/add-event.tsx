import { useState } from "react"
import { observer } from "mobx-react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import FormGroup from "../components/form-group"
import useAddEvent from "../hooks/events/add-event"
import SelectTimes from "../components/add-event/select-times"
import AddressInput from "../components/add-event/address-input"
import isEventDisabled from "../utils/events/is-add-event-disabled"
import AddEventTemplate from "../components/add-event/add-event-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import SelectEventFrequency from "../components/add-event/select-event-frequency"

const libraries: ("places")[] = ["places"]

function AddEvent() {
	useRedirectUnknownUser()
	const [eventDetails, setEventDetails] = useState<CreatingEvent>({
		eventName: "",
		eventPrice: 2,
		eventType: "Entertainment",
		isVirtual: false,
		isActive: true,
		eventPublic: true,
		eventReviewable: true,
		canInvitedUsersInviteOthers: true,

		eventFrequency: "",
		address: "",
		eventDescription: "Test description",
		eventURL: "google.com",

		invitees: [],
		coHosts: [],
		eventCapacity: 10,

		singularEventTime: null,
		customEventDates: [],
		ongoingEventTimes: []
	})
	const addEvent = useAddEvent()

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	return (
		<AddEventTemplate>
			<form onSubmit={(e) => addEvent(e, eventDetails)}>
				<FormGroup
					id="event-name"
					label="Event Name"
					type="text"
					placeholder="Save Princess Peach"
					onChange={(e) => setEventDetails({...eventDetails, eventName: e.target.value})}
					required
					value={eventDetails.eventName}
				/>
				{isLoaded && (
					<AddressInput
						eventDetails={eventDetails}
						setEventDetails={setEventDetails}
					/>
				)}
				<SelectEventFrequency
					eventDetails={eventDetails}
					setEventDetails={setEventDetails}
				/>
				<SelectTimes
					eventDetails={eventDetails}
					setEventDetails={setEventDetails}
				/>

				<div className="mt-2">
					<Button
						title= {`Add ${eventDetails.eventName || "Event"}`}
						disabled={isEventDisabled(eventDetails)}
						colorClass="bg-green-500"
						hoverClass="hover:bg-green-700"
					/>
				</div>
			</form>
		</AddEventTemplate>
	)
}

export default observer(AddEvent)
