import { useState } from "react"
import { useLoadScript } from "@react-google-maps/api"
import Button from "../components/button"
import FormGroup from "../components/form-group"
import useAddEvent from "../hooks/events/add-event"
import isEventDisabled from "../utils/events/is-add-event-disabled"
import AddressInput from "../components/add-event/address-input"
import AddEventTemplate from "../components/add-event/add-event-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import formatDateToDateTimeLocal from "../utils/events/format-date-to-date-time-local"
import DayTimeSelector from "../components/add-event/day-time-selector"
import EventDurationSelector from "../components/add-event/event-duration-selector"

const libraries: ("places")[] = ["places"]

enum DayOfWeekEnum {
	Sunday = "Sunday",
	Monday = "Monday",
	Tuesday = "Tuesday",
	Wednesday = "Wednesday",
	Thursday = "Thursday",
	Friday = "Friday",
	Saturday = "Saturday",
}

// eslint-disable-next-line max-lines-per-function
export default function AddEvent() {
	useRedirectUnknownUser()
	const [eventDetails, setEventDetails] = useState<CreatingEvent>({
		eventName: "",
		eventFrequency: "",
		address: "",
		eventTimeSpanMinutes: {
			hours: 0,
			minutes: 0,
		},

		ongoingEventTimes: [],
		dates: [],
		eventTime: new Date(),
	})
	const addEvent = useAddEvent()

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries,
	})

	const handleDurationChange = (hours: number, minutes: number) => {
		console.log(`Event Duration: ${hours} hours and ${minutes} minutes`)

		setEventDetails({
			...eventDetails,
			eventTimeSpanMinutes: {
				hours: hours,
				minutes: minutes
			}
		})
	}

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
				<select
					value={eventDetails.eventFrequency}
					onChange={(e) => setEventDetails({...eventDetails, eventFrequency: e.target.value as EventFrequency})}
				>
					<option value = "">Select Event Frequency</option>
					<option value="ongoing">Ongoing</option>
					<option value="one-time">One-time</option>
					<option value="repeated">Non-standard Repeated</option>
					<option value="regularly-repeated">Non-standard Repeated</option>
				</select>
				<EventDurationSelector onDurationChange={handleDurationChange} />
				{eventDetails.eventFrequency === "one-time" && (
					<FormGroup
						id="event-date-time"
						label="Event Date and Time"
						type="datetime-local"
						onChange={(e) => setEventDetails({...eventDetails, eventTime: new Date(e.target.value)})}
						required
						value={eventDetails.eventTime instanceof Date ? formatDateToDateTimeLocal(eventDetails.eventTime) : ""}
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
