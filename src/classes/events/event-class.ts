import { action, makeAutoObservable } from "mobx"

export default class EventClass {
	constructor(eventData: EventFromDB) {
		makeAutoObservable(this)
		this.eventId = eventData._id
		this.address = eventData.address
		this.attendees = eventData.attendees
		this.canInvitedUsersInviteOthers = eventData.canInvitedUsersInviteOthers
		this.coHosts = eventData.coHosts
		this.createdBy = eventData.createdBy
		this.customEventDates = eventData.customEventDates
		this.eventCapacity = eventData.eventCapacity
		this.eventDescription = eventData.eventDescription
		this.eventImageURL = eventData.eventImageURL
		this.eventFrequency = eventData.eventFrequency
		this.eventName = eventData.eventName
		this.eventPrice = eventData.eventPrice
		this.eventPublic = eventData.eventPublic
		this.eventReviewable = eventData.eventReviewable
		this.eventType = eventData.eventType
		this.eventURL = eventData.eventURL
		this.extraEventCategories = eventData.extraEventCategories
		this.invitees = eventData.invitees
		this.isActive = eventData.isActive
		this.isVirtual = eventData.isVirtual
		this.ongoingEventTimes = eventData.ongoingEventTimes
		this.singularEventTime = eventData.singularEventTime
		this.organizer = eventData.organizer

		this.createdAt = eventData.createdAt
		this.updatedAt = eventData.updatedAt
	}

	public eventId: string
	public address: string
	public attendees: EventfullAttendee[]
	public canInvitedUsersInviteOthers: boolean
	public coHosts: EventfullCoHost[]
	public createdBy: {
		createdAt: Date
		isCreatedByAdmin: boolean
		userId: string
		username: string
	}
	public customEventDates: EventfullBaseEventTime[]
	public eventCapacity: number | null
	public eventDescription: string
	public eventFrequency: EventFrequency
	public eventImageURL?: string
	public eventName: string
	public eventPrice: number
	public eventPublic: boolean
	public eventReviewable: boolean
	public eventType: string
	public eventURL?: string
	public extraEventCategories: string[]
	public invitees: EventfullInvitee[]
	public isActive: boolean
	public isVirtual: boolean
	public ongoingEventTimes: EventfullOngoingEventTime[]
	public singularEventTime: EventfullBaseEventTime | null
	public organizer?: SocialData

	public createdAt: Date
	public updatedAt: Date

	public deleteEvent = action((): void => {
		this.isActive = false
	})
}
