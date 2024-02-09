import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import useEditEvent from "../hooks/events/edit/edit-event"
import CardTemplate from "../components/card-template"
import AppContext from "../contexts/eventfull-it-context"
import ImageUploader from "../components/image-uploader"
import useSetSingleEvent from "../hooks/events/set/set-single-event"
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
import ShowPictures from "../components/add-or-edit-event/show-pictures"

const libraries: ("places")[] = ["places"]

// eslint-disable-next-line max-lines-per-function
function EditEvent() {
	useRedirectUnknownUser()
	const appContext = useContext(AppContext)
	const { eventId } = useParams<{ eventId: string }>()

	const [eventDetails, setEventDetails] = useState<EventFromDB>({
		_id: "",
		__v: 0,
		eventName: "",
		eventPrice: 0,
		eventType: "",
		isVirtual: false,
		isActive: true,
		eventPublic: true,
		eventReviewable: true,
		canInvitedUsersInviteOthers: true,

		eventFrequency: "one-time",
		address: "",
		eventDescription: "",
		eventImages: [],
		eventURL: "",

		invitees: [],
		coHosts: [],
		attendees: [],
		eventCapacity: 10,
		createdBy: {
			username: "",
			userId: "",
			createdAt: new Date(),
			isCreatedByAdmin: false,
		},
		customEventDates: [],
		ongoingEventTimes: [],
		singularEventTime: {
			startTime: new Date(),
			endTime: new Date(),
			eventDuration: {
				hours: 0,
				minutes: 0,
			}
		},
		extraEventCategories: [],
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	const [selectedImages, setSelectedImages] = useState<File[]>([]) // to be used for uploading images
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	const retrievedEvent = useSetSingleEvent(eventId, setError, setEventDetails)
	const editEvent = useEditEvent(retrievedEvent, eventDetails, selectedImages, setError, setIsSubmitting)

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	if (_.isNil(eventDetails._id) || _.isEmpty(eventDetails._id)) {
		return <>This event does not exist</>
	}

	const setEventDetailsGeneric = (newEventDetails: Partial<CreatingEvent | EventFromDB>) => {
		setEventDetails(prev => {
			return { ...prev, ...newEventDetails as Partial<EventFromDB> }
		})
	}

	function ChangesMade () {
		if (
			!_.isEqual(eventDetails, retrievedEvent) ||
			!_.isEmpty(selectedImages)
		) return null
		return <>(No Changes made)</>
	}

	const activeImagesCount = eventDetails.eventImages.reduce((count, image) => image.isActive ? count + 1 : count, 0)

	return (
		<CardTemplate title="Edit Event">
			<form onSubmit={editEvent}>
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
					eventDetailsPicturesLength={activeImagesCount}
					selectedImages={selectedImages}
					setSelectedImages={setSelectedImages}
				/>

				<ShowPictures
					eventDetails={eventDetails}
					setEventDetails = {setEventDetails}
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

				<div className="flex flex-row mt-2">
					<Button
						title= {`Edit ${eventDetails.eventName}`}
						disabled={isAddOrSaveEventDisabled(eventDetails) || isSubmitting}
						colorClass="bg-orange-500"
						hoverClass="hover:bg-orange-600"
						className="text-white font-bold"
					/>
					<ChangesMade />
				</div>
			</form>
		</CardTemplate>
	)
}

export default observer(EditEvent)
