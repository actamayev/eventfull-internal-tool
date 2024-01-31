import { useState } from "react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import FormGroup from "../components/form-group"
import useAddEvent from "../hooks/events/add-event"
import AddressInput from "../components/add-event/address-input"
import isEventDisabled from "../utils/events/is-add-event-disabled"
import DayTimeSelector from "../components/add-event/day-time-selector"
import AddEventTemplate from "../components/add-event/add-event-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ChooseOneTimeEvent from "../components/add-event/choose-one-time-event"

const libraries: ("places")[] = ["places"]

enum DayOfWeekEnum {
	Sunday = "Sunday",
	Monday = "Monday",
	Tuesday = "Tuesday",
	Wednesday = "Wednesday",
	Thursday = "Thursday",
	Friday = "Friday",
	Saturday = "Saturday"
}

// eslint-disable-next-line max-lines-per-function
export default function AddEvent() {
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
				<div className="mt-1 mb-4">

					<select
						value={eventDetails.eventFrequency}
						onChange={(e) => setEventDetails({...eventDetails, eventFrequency: e.target.value as EventFrequency})}
						className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white \
							rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						<option value="">Select Event Frequency</option>
						<option value="one-time">One-time</option>
						<option value="ongoing">Ongoing</option>
						<option value="custom">Custom</option>
					</select>

				</div>
				{eventDetails.eventFrequency === "one-time" && (
					<ChooseOneTimeEvent
						eventDetails={eventDetails}
						setEventDetails={setEventDetails}
					/>
				)}
				{eventDetails.eventFrequency === "ongoing" && (
					Object.values(DayOfWeekEnum).map((day, index) => (
						<DayTimeSelector
							key={day}
							day={day}
							index={index}
							eventDetails={eventDetails}
							setEventDetails={setEventDetails}
						/>
					))
				)}
				{/* TODO: Add custom event dates. literally just selecting date times from a calendar */}
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
