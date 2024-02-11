import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import CardTemplate from "../components/card-template"
import useAddEventCategory from "../hooks/events/add/add-event-category"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import EventCategoryInput from "../components/add-event-category/event-category-name-input"
import useRetrieveEventCategories from "../hooks/events/retrieve/retrieve-event-categories"
import EventCategoryDescriptionInput from "../components/add-event-category/event-category-description-input"
import useIsNewEventCategoryDisabled from "../hooks/events/is-button-disabled/is-new-event-category-disabled"

function AddEventCategory() {
	useRedirectUnknownUser()
	const [eventCategory, setEventCategory] = useState<CreatingEventCategory>({
		eventCategoryName: "",
		description: "",
	})
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	useRetrieveEventCategories()
	const isNewEventCategoryDisabled = useIsNewEventCategoryDisabled(eventCategory, setMessage)
	const addEventCategory = useAddEventCategory(eventCategory, setError, setIsSubmitting)

	const setEventDetailsGeneric = (newEventDetails: Partial<CreatingEventCategory | EventCategoryFromDB>) => {
		setEventCategory(prev => {
			return { ...prev, ...newEventDetails as Partial<EventCategoryFromDB> }
		})
	}

	return (
		<CardTemplate title="Add Event Category">
			<form onSubmit={addEventCategory}>
				<EventCategoryInput
					eventCategory={eventCategory}
					setEventCategory={setEventDetailsGeneric}
				/>

				<EventCategoryDescriptionInput
					eventCategory={eventCategory}
					setEventCategory={setEventDetailsGeneric}
				/>

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Add${eventCategory.eventCategoryName ? (": " + eventCategory.eventCategoryName) : ""}`}
						disabled={isSubmitting || isNewEventCategoryDisabled}
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

export default observer(AddEventCategory)
