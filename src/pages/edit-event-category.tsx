import _ from "lodash"
import { useState } from "react"
import { observer } from "mobx-react"
import { useParams } from "react-router-dom"
import Button from "../components/button"
import CardTemplate from "../components/card-template"
import useEditEventCategory from "../hooks/events/edit/edit-event-category"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import ErrorMessage from "../components/login-and-registration-form/error-message"
import useSetSingleEventCategory from "../hooks/events/set/set-single-event-category"
import EventCategoryInput from "../components/add-event-category/event-category-name-input"
import useRetrieveEventCategories from "../hooks/events/retrieve/retrieve-event-categories"
import EventCategoryDescriptionInput from "../components/add-event-category/event-category-description-input"
import isEditEventCategoryDisabled from "../utils/events/is-edit-event-category-button-disabled"

function EditEventCategory() {
	useRedirectUnknownUser()
	const { eventCategoryId } = useParams<{ eventCategoryId: string }>()
	const [eventCategory, setEventCategory] = useState<EventCategoryFromDB>({
		_id: "",
		eventCategoryName: "",
		description: "",
		createdBy: {
			adminId: "",
			username: "",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	const [error, setError] = useState("")
	const [isSubmitting, setIsSubmitting] = useState(false)
	useRetrieveEventCategories()
	const retrievedEventCategory = useSetSingleEventCategory(eventCategoryId, setError, setEventCategory)
	const addEventCategory = useEditEventCategory(retrievedEventCategory, eventCategory, setError, setIsSubmitting)

	const setEventCategoryGeneric = (newEventCategory: Partial<CreatingEventCategory | EventCategoryFromDB>) => {
		setEventCategory(prev => {
			return { ...prev, ...newEventCategory as Partial<EventCategoryFromDB> }
		})
	}

	function ChangesMade () {
		if (!_.isEqual(eventCategory, retrievedEventCategory)) return null
		return <>(No Changes made)</>
	}

	return (
		<CardTemplate title="Edit Event Category">
			<form onSubmit={addEventCategory}>
				<EventCategoryInput
					eventCategory={eventCategory}
					setEventCategory={setEventCategoryGeneric}
				/>

				<EventCategoryDescriptionInput
					eventCategory={eventCategory}
					setEventCategory={setEventCategoryGeneric}
				/>

				<ErrorMessage error={error} />

				<div className="mt-2">
					<Button
						title= {`Edit${eventCategory.eventCategoryName ? (": " + eventCategory.eventCategoryName) : ""}`}
						disabled={isSubmitting || isEditEventCategoryDisabled(eventCategory)}
						colorClass="bg-emerald-600"
						hoverClass="hover:bg-emerald-700"
						className="text-white font-semibold"
					/>
					<ChangesMade />
				</div>
			</form>
		</CardTemplate>
	)
}

export default observer(EditEventCategory)
