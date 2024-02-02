import _ from "lodash"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import FormGroup from "../components/form-group"
import useEditEvent from "../hooks/events/edit-event"
import AppContext from "../contexts/eventfull-it-context"
import SelectTimes from "../components/add-event/select-times"
import AddressInput from "../components/add-event/address-input"
import isEventDisabled from "../utils/events/is-add-event-disabled"
import EventTemplate from "../components/event-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import SelectEventFrequency from "../components/add-event/select-event-frequency"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useSetSingleEvent from "../hooks/events/set-single-event"

const libraries: ("places")[] = ["places"]

// eslint-disable-next-line max-lines-per-function
function EditEvent() {
	useRedirectUnknownUser()
	const appContext = useContext(AppContext)
	const { eventId } = useParams<{ eventId: string }>()

	const [eventDetails, setEventDetails] = useState<EventFromDB>({
		_id: "",
		eventName: "",
		eventPrice: 2,
		eventType: "Entertainment",
		isVirtual: false,
		isActive: true,
		eventPublic: true,
		eventReviewable: true,
		canInvitedUsersInviteOthers: true,

		eventFrequency: "one-time",
		address: "",
		eventDescription: "Test description",
		eventURL: "google.com",

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
	const [error, setError] = useState("")
	useSetSingleEvent(eventId, setError, setEventDetails)
	const editEvent = useEditEvent()

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	if (_.isEmpty(eventDetails._id)) {
		return (
			<>
				This event does not exist
			</>
		)
	}

	const setEventDetailsGeneric = (newEventDetails: Partial<CreatingEvent | EventFromDB>) => {
		setEventDetails(prev => {
			return { ...prev, ...newEventDetails as Partial<EventFromDB> }
		})
	}

	return (
		<EventTemplate title="Edit">
			<form onSubmit={(e) => editEvent(e, eventDetails, setError)}>
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
						setEventDetails={setEventDetailsGeneric}
					/>
				)}
				<SelectEventFrequency
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
						title= {`Edit ${eventDetails.eventName}`}
						disabled={isEventDisabled(eventDetails)}
						colorClass="bg-green-500"
						hoverClass="hover:bg-green-700"
					/>
				</div>
			</form>
		</EventTemplate>
	)
}

export default observer(EditEvent)
