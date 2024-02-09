import _ from "lodash"
import { action, makeObservable, observable } from "mobx"
import EventClass from "./event-class"

export default class EventsClass {
	public eventsMap: Map<string, EventClass> = new Map() // key: event id, value: EventClass
	public eventTypes: Map<string, EventTypeFromDB> = new Map() // key: event type, value: EventType
	public eventCategories: Map<string, EventCategoryFromDB> = new Map() // key: category _id, value: Event Category

	constructor() {
		makeObservable(this, {
			eventsMap: observable,
			eventTypes: observable,
			eventCategories: observable,
		})
	}

	// Events:
	public contextForEvent(eventId: string): EventClass | undefined {
		const event = this.eventsMap.get(eventId)
		return event
	}

	public addEvent = action((event: EventFromDB): void =>  {
		if (this.eventsMap.has(event._id)) return
		const newEvent = new EventClass(event)
		this.eventsMap.set(event._id, newEvent)
	})

	public getLastEvent(): EventClass | null {
		const keys = Array.from(this.eventsMap.keys())
		if (_.isEmpty(keys)) return null
		return this.eventsMap.get(keys[keys.length - 1]) || null
	}

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

	// Event Categories:
	public assignEventCategories = action((eventCategoriesFromDB: EventCategoryFromDB[]): void => {
		eventCategoriesFromDB.forEach((eventCategory) => {
			this.addEventCategory(eventCategory)
		})
	})

	public addEventCategory = action((newCategory: EventCategoryFromDB): void => {
		if (this.eventCategories.has(newCategory._id)) return
		this.eventCategories.set(newCategory._id, {
			_id: newCategory._id,
			eventCategoryName: newCategory.eventCategoryName,
			description: newCategory.description,
			createdBy: newCategory.createdBy,
			createdAt: newCategory.createdAt,
			updatedAt: newCategory.updatedAt,
		})
	})

	public editEventCategory = action((category: EventCategoryFromDB): void => {
		if (this.eventCategories.has(category._id) === false) return
		this.eventCategories.set(category._id, category)
	})

	public removeEventCategory = action((categoryId: string): void => {
		this.eventCategories.delete(categoryId)
	})

	// Event Types:
	public assignEventTypes = action((eventTypesFromDB: EventTypeFromDB[]): void => {
		eventTypesFromDB.forEach((eventType) => {
			this.addEventType(eventType)
		})
	})

	public addEventType = action((eventType: EventTypeFromDB): void => {
		if (this.eventTypes.has(eventType._id)) return
		this.eventTypes.set(eventType._id, {
			_id: eventType._id,
			eventTypeName: eventType.eventTypeName,
			description: eventType.description,
			categories: eventType.categories,
			createdAt: eventType.createdAt,
			updatedAt: eventType.updatedAt,
			createdBy: eventType.createdBy,
		})
	})

	public editEventType = action((eventType: EventTypeFromDB): void => {
		if (this.eventTypes.has(eventType._id) === false) return
		this.eventTypes.set(eventType._id, eventType)
	})

	public removeEventType = action((eventTypeId: string): void => {
		this.eventTypes.delete(eventTypeId)
	})

}
