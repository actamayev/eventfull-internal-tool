import _ from "lodash"
import { observer } from "mobx-react"
import { useCallback, useContext } from "react"
import Button from "../button"
import AppContext from "../../contexts/eventfull-it-context"

interface Props {
	setEventDetails: (value: React.SetStateAction<CreatingEvent>) => void
}

function FillInPreviousEventButton(props: Props) {
	const { setEventDetails } = props
	const appContext = useContext(AppContext)

	const convertEventToCreatingEvent = useCallback((event: EventFromDB): CreatingEvent => {
		return {
			eventName: event.eventName,
			eventPrice: event.eventPrice,
			eventType: event.eventType,
			isVirtual: event.isVirtual,
			isActive: event.isActive,
			eventPublic: event.eventPublic,
			eventReviewable: event.eventReviewable,
			canInvitedUsersInviteOthers: event.canInvitedUsersInviteOthers,
			extraEventCategories: event.extraEventCategories,

			eventFrequency: event.eventFrequency,
			address: event.address,
			eventDescription: event.eventDescription,
			eventURL: event.eventURL,

			invitees: [],
			coHosts: [],
			eventCapacity: event.eventCapacity || 10,

			singularEventTime: event.singularEventTime,
			customEventDates: event.customEventDates,
			ongoingEventTimes: event.ongoingEventTimes
		}
	}, [])

	if (_.isNull(appContext.eventsData)) return null
	const lastEvent = appContext.eventsData.getLastEvent()
	if (_.isNull(lastEvent)) return null

	return (
		<Button
			title={`Fill in previous event's details (${lastEvent.eventName})`}
			colorClass="bg-sky-500"
			hoverClass="hover:bg-sky-600"
			onClick={() => setEventDetails(convertEventToCreatingEvent(lastEvent))}
			className="text-white font-semibold"
		/>
	)
}

export default observer(FillInPreviousEventButton)
