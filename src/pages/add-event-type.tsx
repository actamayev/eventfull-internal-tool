import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import CardTemplate from "../components/card-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useAddEventType from "../hooks/events/add/add-event-type"
import EventTypeNameInput from "../components/add-event-type/event-type-input"
import EventTypeDescriptionInput from "../components/add-event-type/event-type-description-input"
import SelectEventCategories from "../components/add-event-type/select-event-categories"
import useRetrieveEventTypes from "../hooks/events/retrieve/retrieve-event-types"
import useRetrieveEventCategories from "../hooks/events/retrieve/retrieve-event-categories"
import useIsNewEventTypeDisabled from "../hooks/events/is-button-disabled/is-new-event-type-disabled"

function AddEventType() {
	useRedirectUnknownUser()
	const [eventType, setEventType] = useState<CreatingEventType>({
		eventTypeName: "",
		description: "",
		categories: [],
	})
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	useRetrieveEventTypes()
	useRetrieveEventCategories()
	const isNewEventTypeDisabled = useIsNewEventTypeDisabled(eventType, setMessage)
	const addEventCategory = useAddEventType(eventType, setError, setIsSubmitting)

	const setEventTypeGeneric = (newEventType: Partial<CreatingEventType | EventTypeFromDB>) => {
		setEventType(prev => {
			return { ...prev, ...newEventType as Partial<EventTypeFromDB> }
		})
	}

	return (
		<CardTemplate title="Add Event Type">
			<form onSubmit={addEventCategory}>
				<EventTypeNameInput
					eventType={eventType}
					setEventType={setEventTypeGeneric}
				/>

				<EventTypeDescriptionInput
					eventType={eventType}
					setEventType={setEventTypeGeneric}
				/>

				<SelectEventCategories
					eventType={eventType}
					setEventType={setEventTypeGeneric}
				/>

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Add${eventType.eventTypeName ? (": " + eventType.eventTypeName) : ""}`}
						disabled={isSubmitting || isNewEventTypeDisabled}
						colorClass="bg-emerald-600"
						hoverClass="hover:bg-emerald-700"
						className="text-white font-semibold"
					/>
					{message && (<p className="text-red-500 text-sm mt-2">{message}</p>)}
				</div>
			</form>
		</CardTemplate>
	)
}

export default observer(AddEventType)
