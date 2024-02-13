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
		const convertBaseEventTimeToJsDate = (baseEventTime: BaseEventTime): BaseEventTime => ({
			...baseEventTime,
			startTime: new Date(baseEventTime.startTime),
			endTime: new Date(baseEventTime.endTime),
		})

		const convertOngoingEventsToJsDate = (ongoingEvent: OngoingEvents): OngoingEvents => ({
			...ongoingEvent,
			startTime: new Date(ongoingEvent.startTime),
			endTime: new Date(ongoingEvent.endTime),
		})
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

			singularEventTime: event.singularEventTime ? convertBaseEventTimeToJsDate(event.singularEventTime) : undefined,
			customEventDates: event.customEventDates.map(convertBaseEventTimeToJsDate),
			ongoingEventTimes: event.ongoingEventTimes.map(convertOngoingEventsToJsDate)
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
