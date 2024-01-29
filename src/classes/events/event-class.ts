import { action, makeAutoObservable } from "mobx"

export default class EventClass {
	constructor(eventData: EventfullEvent) {
		makeAutoObservable(this)
		this.eventId = eventData.eventId
		this.eventName = eventData.eventName
		this.eventFrequency = eventData.eventFrequency
		this.isActive = eventData.isActive
		this.createdAt = eventData.createdAt
		this.updatedAt = eventData.updatedAt
	}

	public eventId: string
	public eventName: string
	public eventFrequency: EventFrequency
	public isActive: boolean
	public createdAt: Date
	public updatedAt: Date

	public updateMessageInChat = action((): EventClass => {
		this.updatedAt = new Date()
		return this
	})

	public deleteMessage = action((): void => {
		this.isActive = false
	})
}
