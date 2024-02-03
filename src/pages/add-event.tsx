import { useCallback, useState } from "react"
import { observer } from "mobx-react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import useAddEvent from "../hooks/events/add-event"
import EventTemplate from "../components/event-template"
import SelectTimes from "../components/add-or-edit-event/select-times"
import AddressInput from "../components/add-or-edit-event/address-input"
import isEventDisabled from "../utils/events/is-add-event-disabled"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ChooseEventFrequency from "../components/add-or-edit-event/choose-event-frequency"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import DescriptionInput from "../components/add-or-edit-event/description-input"
import EventNameInput from "../components/add-or-edit-event/event-name-input"
import EventPriceInput from "../components/add-or-edit-event/event-price-input"
import ChooseEventType from "../components/add-or-edit-event/choose-event-type"
import ToggleVirtualEvent from "../components/add-or-edit-event/is-event-virtual"
import TogglePublicEvent from "../components/add-or-edit-event/is-event-public"
import EventURLInput from "../components/add-or-edit-event/event-url-input"

const libraries: ("places")[] = ["places"]

function AddEvent() {
	useRedirectUnknownUser()
	const [eventDetails, setEventDetails] = useState<CreatingEvent>({
		eventName: "",
		eventPrice: 0,
		eventType: "",
		isVirtual: false,
		isActive: true,
		eventPublic: true,
		eventReviewable: true,
		canInvitedUsersInviteOthers: true,

		eventFrequency: "",
		address: "",
		eventDescription: "",
		eventURL: "",

		invitees: [],
		coHosts: [],
		eventCapacity: 10,

		singularEventTime: null,
		customEventDates: [],
		ongoingEventTimes: []
	})
	const [error, setError] = useState("")
	const addEvent = useAddEvent()

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	const setEventDetailsGeneric = useCallback((newEventDetails: Partial<CreatingEvent | EventFromDB>) => {
		setEventDetails(prev => ({ ...prev, ...newEventDetails as Partial<CreatingEvent> }))
	}, [setEventDetails])

	// TODO: Add a button that auto-fills the form with the previous event's details

	return (
		<EventTemplate title="Add">
			<form onSubmit={(e) => addEvent(e, eventDetails, setError)}>
				<EventNameInput
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				{isLoaded && (
					<AddressInput
						eventDetails={eventDetails}
						setEventDetails={setEventDetailsGeneric}
					/>
				)}

				<DescriptionInput
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>

				<EventPriceInput
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				<ChooseEventType
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				<ToggleVirtualEvent
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				<TogglePublicEvent
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				<EventURLInput
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				<ChooseEventFrequency
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>
				<SelectTimes
					eventDetails={eventDetails}
					setEventDetails={setEventDetailsGeneric}
				/>

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Add ${eventDetails.eventName || "Event"}`}
						disabled={isEventDisabled(eventDetails)}
						colorClass="bg-green-500"
						hoverClass="hover:bg-green-700"
					/>
				</div>
			</form>
		</EventTemplate>
	)
}

export default observer(AddEvent)
