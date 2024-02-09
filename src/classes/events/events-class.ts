import _ from "lodash"
import { action, makeObservable, observable } from "mobx"
import EventClass from "./event-class"

export default class EventsClass {
	public eventsMap: Map<string, EventClass> = new Map() // key: event id, value: EventClass
	public eventTypes: Map<string, CreatingEventType> = new Map() // key: event type, value: EventType
	public eventCategories: Map<string, CreatingEventCategory> = new Map() // key: category _id, value: Event Category

	constructor() {
		makeObservable(this, {
			eventsMap: observable,
			eventTypes: observable,
			eventCategories: observable,
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

	public addEventType = action((eventType: EventTypeFromDB): void => {
		if (this.eventTypes.has(eventType._id)) return
		this.eventTypes.set(eventType._id, {
			eventTypeName: eventType.eventTypeName,
			description: eventType.description,
			categories: eventType.categories
		})
	})

	public assignEventTypes = action((eventTypesFromDB: EventTypeFromDB[]): void => {
		eventTypesFromDB.forEach((eventType) => {
			if (this.eventTypes.has(eventType._id)) return
			this.eventTypes.set(eventType._id, {
				eventTypeName: eventType.eventTypeName,
				description: eventType.description,
				categories: eventType.categories
			})
		})
	})

	public assignEventCategories = action((eventCategoriesFromDB: EventCategoryFromDB[]): void => {
		eventCategoriesFromDB.forEach((eventCategory) => {
			if (this.eventCategories.has(eventCategory._id)) return
			this.eventCategories.set(eventCategory._id, {
				eventCategoryName: eventCategory.eventCategoryName,
				description: eventCategory.description
			})
		})
	})

	public addEventCategory = action((newCategory: EventCategoryFromDB): void => {
		if (this.eventCategories.has(newCategory._id)) return
		this.eventCategories.set(newCategory._id, {
			eventCategoryName: newCategory.eventCategoryName,
			description: newCategory.description
		})
	})
}
