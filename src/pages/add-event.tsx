import { observer } from "mobx-react"
import { useCallback,  useState } from "react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import useAddEvent from "../hooks/events/add-event"
import EventTemplate from "../components/event-template"
import ImageUploader from "../components/image-uploader"
import isAddOrSaveEventDisabled from "../utils/events/is-add-or-save-event-disabled"
import SelectTimes from "../components/add-or-edit-event/select-times"
import AddressInput from "../components/add-or-edit-event/address-input"
import EventURLInput from "../components/add-or-edit-event/event-url-input"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import EventNameInput from "../components/add-or-edit-event/event-name-input"
import EventPriceInput from "../components/add-or-edit-event/event-price-input"
import ChooseEventType from "../components/add-or-edit-event/choose-event-type"
import TogglePublicEvent from "../components/add-or-edit-event/is-event-public"
import DescriptionInput from "../components/add-or-edit-event/description-input"
import ToggleVirtualEvent from "../components/add-or-edit-event/is-event-virtual"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import ChooseEventFrequency from "../components/add-or-edit-event/choose-event-frequency"
import FillInPreviousEventButton from "../components/add-or-edit-event/fill-in-previous-event-button"

const libraries: ("places")[] = ["places"]

// eslint-disable-next-line max-lines-per-function
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
	const [selectedImages, setSelectedImages] = useState<File[]>([])
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const addEvent = useAddEvent(eventDetails, selectedImages, setError, setIsSubmitting)

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	const setEventDetailsGeneric = useCallback((newEventDetails: Partial<CreatingEvent | EventFromDB>) => {
		setEventDetails(prev => ({ ...prev, ...newEventDetails as Partial<CreatingEvent> }))
	}, [setEventDetails])

	return (
		<EventTemplate title="Add">
			<FillInPreviousEventButton setEventDetails={setEventDetails} />
			<form onSubmit={addEvent}>
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

				<ImageUploader
					eventDetailsPicturesLength={0}
					selectedImages={selectedImages}
					setSelectedImages={setSelectedImages}
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
						title= {`Add${eventDetails.eventName ? (": " + eventDetails.eventName) : ""}`}
						disabled={isAddOrSaveEventDisabled(eventDetails) || isSubmitting}
						colorClass="bg-emerald-600"
						hoverClass="hover:bg-emerald-700"
						className="text-white font-semibold"
					/>
				</div>
			</form>
		</EventTemplate>
	)
}

export default observer(AddEvent)
