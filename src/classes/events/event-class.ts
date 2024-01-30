import { action, makeAutoObservable } from "mobx"

export default class EventClass {
	constructor(eventData: EventFromDB) {
		makeAutoObservable(this)
		this.eventId = eventData._id
		this.address = eventData.address
		// this.eventFrequency = eventData.eventFrequency

		this.attendees = eventData.attendees
		this.canInvitedUsersInviteOthers = eventData.canInvitedUsersInviteOthers
		this.coHosts = eventData.coHosts
		this.createdBy = eventData.createdBy
		this.eventCapacity = eventData.eventCapacity
		this.eventDescription = eventData.eventDescription
		this.eventDuration = eventData.eventDuration
		this.eventEndTime = eventData.eventEndTime
		this.eventName = eventData.eventName
		this.eventPrice = eventData.eventPrice
		this.eventPublic = eventData.eventPublic
		this.eventReviewable = eventData.eventReviewable
		this.eventStartTime = eventData.eventStartTime
		this.eventType = eventData.eventType
		this.eventURL = eventData.eventURL
		this.extraEventCategories = eventData.extraEventCategories
		this.invitees = eventData.invitees
		this.isActive = eventData.isActive
		this.isVirtual = eventData.isVirtual

		this.createdAt = eventData.createdAt
		this.updatedAt = eventData.updatedAt
	}

	public eventId: string
	public eventName: string
	// public eventFrequency: EventFrequency
	public isActive: boolean
	public createdAt: Date
	public updatedAt: Date

	public address: string
	public attendees: string[]
	public canInvitedUsersInviteOthers: boolean
	public coHosts: string[]
	public eventCapacity: number | null
	public eventDescription: string
	public eventDuration: {
        hours: number;
        minutes: number;
    }
	public eventEndTime: Date
	public eventPrice: number
	public eventPublic: boolean
	public eventReviewable: boolean
	public eventStartTime: Date
	public eventType: string
	public eventURL: string | null
	public extraEventCategories: string[]
	public invitees: string[]
	public isVirtual: boolean
	public createdBy: {
        createdAt: Date;
        isCreatedByAdmin: boolean;
        userId: string;
        username: string;
    }

	public deleteEvent = action((): void => {
		this.isActive = false
	})
}
