import EventClass from "../../classes/events/event-class"

export default function extractEventData(eventClass: EventClass): EventFromDB {
	return {
		_id: eventClass._id,
		__v: eventClass.__v,
		address: eventClass.address,
		attendees: eventClass.attendees,
		canInvitedUsersInviteOthers: eventClass.canInvitedUsersInviteOthers,
		coHosts: eventClass.coHosts,
		createdBy: eventClass.createdBy,
		customEventDates: eventClass.customEventDates,
		eventCapacity: eventClass.eventCapacity,
		eventDescription: eventClass.eventDescription,
		eventFrequency: eventClass.eventFrequency,
		eventName: eventClass.eventName,
		eventPrice: eventClass.eventPrice,
		eventPublic: eventClass.eventPublic,
		eventReviewable: eventClass.eventReviewable,
		eventType: eventClass.eventType,
		eventURL: eventClass.eventURL,
		extraEventCategories: eventClass.extraEventCategories,
		invitees: eventClass.invitees,
		isActive: eventClass.isActive,
		isVirtual: eventClass.isVirtual,
		ongoingEventTimes: eventClass.ongoingEventTimes,
		singularEventTime: eventClass.singularEventTime,
		organizer: eventClass.organizer,
		eventImages: eventClass.eventImages,

		createdAt: eventClass.createdAt,
		updatedAt: eventClass.updatedAt,
	}
}
