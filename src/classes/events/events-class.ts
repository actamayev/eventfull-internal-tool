import _ from "lodash"
import { makeAutoObservable } from "mobx"
import EventClass from "./event-class"

export default class EventsClass {
	public eventsMap: Map<string, EventClass> = new Map()

	constructor() {
		makeAutoObservable(this)
	}

	public contextForEvent(eventId: string): EventClass | undefined {
		const event = this.eventsMap.get(eventId)
		return event
	}

	public addEvent(event: NewEventResponse): void {
		if (this.eventsMap.has(event.eventId)) return
		const newEvent = new EventClass(event)
		this.eventsMap.set(event.eventId, newEvent)
	}

	public removeEvent(eventId: string): void {
		const event = this.eventsMap.get(eventId)
		if (_.isUndefined(event)) return
		event.deleteMessage()
	}
}
