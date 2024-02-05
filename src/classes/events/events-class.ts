import _ from "lodash"
import { action, makeObservable, observable } from "mobx"
import EventClass from "./event-class"

export default class EventsClass {
	public eventsMap: Map<string, EventClass> = new Map()

	constructor() {
		makeObservable(this, {
			eventsMap: observable,
		})
	}

	public contextForEvent(eventId: string): EventClass | undefined {
		const event = this.eventsMap.get(eventId)
		return event
	}

	public addEvent = action((event: EventFromDB): void =>  {
		if (this.eventsMap.has(event._id)) return
		const newEvent = new EventClass(event)
		this.eventsMap.set(event._id, newEvent)
	})

	public editEvent = action((event: EventFromDB): void => {
		if (this.eventsMap.has(event._id) === false) return
		const newEvent = new EventClass(event)
		this.eventsMap.set(event._id, newEvent)
	})

	public removeEvent = action((eventId: string): void => {
		const event = this.eventsMap.get(eventId)
		if (_.isUndefined(event)) return
		event.deleteEvent()
		this.eventsMap.delete(eventId)
	})

	public getLastEvent(): EventClass | null {
		const keys = Array.from(this.eventsMap.keys())
		if (_.isEmpty(keys)) return null
		return this.eventsMap.get(keys[keys.length - 1]) || null
	}
}
