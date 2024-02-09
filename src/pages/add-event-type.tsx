import { observer } from "mobx-react"
import { useState } from "react"
import Button from "../components/button"
import CardTemplate from "../components/card-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useAddEventType from "../hooks/events/add-event-type"
import EventTypeNameInput from "../components/add-event-type/event-type-input"
import EventTypeDescriptionInput from "../components/add-event-type/event-type-description-input"
import SelectEventCategories from "../components/add-event-type/select-event-categories"
import useRetrieveEventTypes from "../hooks/events/retrieve-event-types"
import useRetrieveEventCategories from "../hooks/events/retrieve-event-categories"

function AddEventType() {
	useRedirectUnknownUser()
	const [eventType, setEventType] = useState<CreatingEventType>({
		eventTypeName: "",
		description: "",
		categories: [],
	})
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	useRetrieveEventTypes()
	useRetrieveEventCategories()
	const addEventCategory = useAddEventType(eventType, setError, setIsSubmitting)

	// TODO: when accessing this page,need to make sure event categories and event types are loaded

	return (
		<CardTemplate title="Add Event Type">
			<form onSubmit={addEventCategory}>
				<EventTypeNameInput
					eventType={eventType}
					setEventType={setEventType}
				/>

				<EventTypeDescriptionInput
					eventType={eventType}
					setEventType={setEventType}
				/>

				<SelectEventCategories
					eventType={eventType}
					setEventType={setEventType}
				/>

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Add${eventType.eventTypeName ? (": " + eventType.eventTypeName) : ""}`}
						disabled={isSubmitting}
						// TODO: add a function to make sure all fields are filled
						// and that the event category name is unique
						colorClass="bg-emerald-600"
						hoverClass="hover:bg-emerald-700"
						className="text-white font-semibold"
					/>
				</div>
			</form>
		</CardTemplate>
	)
}

export default observer(AddEventType)
