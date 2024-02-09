import { useState } from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import CardTemplate from "../components/card-template"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useAddEventCategory from "../hooks/events/add-event-category"
import EventCategoryInput from "../components/add-event-category/event-category-name-input"
import EventCategoryDescriptionInput from "../components/add-event-category/event-category-description-input"
import useRetrieveEventTypes from "../hooks/events/retrieve-event-types"
import useRetrieveEventCategories from "../hooks/events/retrieve-event-categories"

function AddEventCategory() {
	useRedirectUnknownUser()
	const [eventCategory, setEventCategory] = useState<CreatingEventCategory>({
		eventCategoryName: "",
		description: "",
	})
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	useRetrieveEventTypes()
	useRetrieveEventCategories()
	const addEventCategory = useAddEventCategory(eventCategory, setError, setIsSubmitting)

	return (
		<CardTemplate title="Add Event Category">
			<form onSubmit={addEventCategory}>
				<EventCategoryInput
					eventCategory={eventCategory}
					setEventCategory={setEventCategory}
				/>

				<EventCategoryDescriptionInput
					eventCategory={eventCategory}
					setEventCategory={setEventCategory}
				/>

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Add${eventCategory.eventCategoryName ? (": " + eventCategory.eventCategoryName) : ""}`}
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

export default observer(AddEventCategory)
