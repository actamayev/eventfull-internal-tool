import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../components/button"
import CardTemplate from "../components/card-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import EventTypeNameInput from "../components/add-event-type/event-type-input"
import EventTypeDescriptionInput from "../components/add-event-type/event-type-description-input"
import SelectEventCategories from "../components/add-event-type/select-event-categories"
import useRetrieveEventTypes from "../hooks/events/retrieve/retrieve-event-types"
import useRetrieveEventCategories from "../hooks/events/retrieve/retrieve-event-categories"
import useEditEventType from "../hooks/events/edit/edit-event-type"
import useSetSingleEventType from "../hooks/events/set/set-single-event-type"
import isEditEventTypeDisabled from "../utils/events/is-edit-event-type-button-disabled"

function EditEventType() {
	useRedirectUnknownUser()
	const { eventTypeId } = useParams<{ eventTypeId: string }>()
	const [eventType, setEventType] = useState<EventTypeFromDB>({
		_id: "",
		eventTypeName: "",
		description: "",
		categories: [],
		createdBy: {
			adminId: "",
			username: "",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	useRetrieveEventTypes()
	useRetrieveEventCategories()
	const retrievedEventType = useSetSingleEventType(eventTypeId, setError, setEventType)
	const editEventType = useEditEventType(retrievedEventType, eventType, setError, setIsSubmitting)

	const setEventTypeGeneric = (newEventType: Partial<CreatingEventType | EventTypeFromDB>) => {
		setEventType(prev => {
			return { ...prev, ...newEventType as Partial<EventTypeFromDB> }
		})
	}

	return (
		<CardTemplate title="Add Event Type">
			<form onSubmit={editEventType}>
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
				{/* TODO: Add a list of selected categories here (with a delete button for each one) */}

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Add${eventType.eventTypeName ? (": " + eventType.eventTypeName) : ""}`}
						disabled={isSubmitting || isEditEventTypeDisabled(eventType)}
						colorClass="bg-emerald-600"
						hoverClass="hover:bg-emerald-700"
						className="text-white font-semibold"
					/>
				</div>
			</form>
		</CardTemplate>
	)
}

export default observer(EditEventType)
