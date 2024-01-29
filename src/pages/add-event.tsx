import _ from "lodash"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoadScript } from "@react-google-maps/api"
import FormGroup from "../components/form-group"
import EventsClass from "../classes/events/events-class"
import AppContext from "../contexts/eventfull-it-context"
import { isNonSuccessResponse } from "../utils/type-checks"
import AddressInput from "../components/add-event/address-input"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import Button from "../components/button"

export default function AddEvent() {
	useRedirectUnknownUser()
	const appContext = useContext(AppContext)
	const [eventName, setEventName] = useState("")
	const [eventFrequency, setEventFrequency] = useState<EventFrequency>("ongoing")
	const [eventDates, setEventDates] = useState([]) // For non-standard repeated events
	const [eventDateTime, setEventDateTime] = useState("") // For one-time events
	const navigate = useNavigate()

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
		libraries: ["places"],
	})

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		try {
			// const response = await appContext.eventfullApiClient.eventsDataService.addEvent({
			// 	name: eventName,
			// 	frequency: eventFrequency,
			// 	dates: eventDates,
			// 	dateTime: eventDateTime,
			// })

			// if (!_.isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			// 	console.error(response)
			// 	return
			// }

			// if (_.isNull(appContext.eventsData)) appContext.eventsData = new EventsClass()
			// appContext.eventsData.addEvent(response.data)
			navigate("/dashboard")
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="flex">
			<div className="flex-grow">
				<div className="mx-auto w-full max-w-md">
					<h1>Add Event</h1>
					<form onSubmit={handleSubmit}>
						<FormGroup
							id="event-name"
							label="Event Name"
							type="text"
							placeholder="Event Name"
							onChange={(e) => setEventName(e.target.value)}
							required
							value={eventName}
						/>
						{isLoaded && <AddressInput />}
						<select value={eventFrequency} onChange={(e) => setEventFrequency(e.target.value as EventFrequency)}>
							<option value="ongoing">Ongoing</option>
							<option value="one-time">One-time</option>
							<option value="repeated">Non-standard Repeated</option>
							<option value="regularly-repeated">Non-standard Repeated</option>
						</select>
						{eventFrequency === "one-time" && (
							<FormGroup
								id="event-date-time"
								label="Event Date and Time"
								type="datetime-local"
								onChange={(e) => setEventDateTime(e.target.value)}
								required
								value={eventDateTime}
							/>
						)}
						{/* {eventFrequency === "repeated" && (
                // Component or logic to handle multiple date-time inputs
            )} */}
						<Button
							title="Add Event"
							disabled={_.isEmpty(eventName) || _.isEmpty(eventDateTime)}
							colorClass="bg-green-500"
							hoverClass="hover:bg-green-700"
						/>
					</form>
				</div>
			</div>
		</div>
	)
}
