import _ from "lodash"
import { action, makeObservable, observable } from "mobx"

export default class EventsClass {
	public eventsMap: Map<string, EventFromDB> = new Map() // key: event id, value: EventFromDB
	public eventTypes: Map<string, EventTypeFromDB> = new Map() // key: event type _id, value: EventType
	public eventCategories: Map<string, EventCategoryFromDB> = new Map() // key: category _id, value: Event Category

	constructor() {
		makeObservable(this, {
			eventsMap: observable,
			eventTypes: observable,
			eventCategories: observable,
		})
	}

	// Events:
	public contextForEvent(eventId: string): EventFromDB | undefined {
		return this.eventsMap.get(eventId)
	}

	public addEvent = action((event: EventFromDB): void =>  {
		if (this.eventsMap.has(event._id)) return
		this.eventsMap.set(event._id, event)
	})

	public getLastEvent(): EventFromDB | null {
		const keys = Array.from(this.eventsMap.keys())
		if (_.isEmpty(keys)) return null
		return this.eventsMap.get(keys[keys.length - 1]) || null
	}

	public editEvent = action((editedEvent: EventFromDB): void => {
		if (this.eventsMap.has(editedEvent._id) === false) return
		this.eventsMap.set(editedEvent._id, editedEvent)
	})

	public removeEvent = action((eventId: string): void => {
		const event = this.eventsMap.get(eventId)
		if (_.isUndefined(event)) return
		this.eventsMap.delete(eventId)
	})

	// Event Categories:
	public assignEventCategories = action((eventCategoriesFromDB: EventCategoryFromDB[]): void => {
		eventCategoriesFromDB.forEach((eventCategory) => this.addEventCategory(eventCategory))
	})

	public addEventCategory = action((newCategory: EventCategoryFromDB): void => {
		if (this.eventCategories.has(newCategory._id)) return
		this.eventCategories.set(newCategory._id, newCategory)
	})

	public editEventCategory = action((category: EventCategoryFromDB): void => {
		if (this.eventCategories.has(category._id) === false) return
		this.eventCategories.set(category._id, category)
		if (_.isEmpty(this.eventTypes)) return
		this.eventTypes.forEach((eventType) => {
			// Check if any category within eventType.categories matches the given category._id
			const categoryIndex = eventType.categories.findIndex(cat => cat.categoryId === category._id)

			if (categoryIndex !== -1) {
				// Found the category, now updating it with new values
				eventType.categories[categoryIndex].eventCategoryName = category.eventCategoryName
				eventType.categories[categoryIndex].description = category.description

				// Update the eventType in the map
				this.eventTypes.set(eventType._id, eventType)
			}
		})
	})

	public removeEventCategory = action((categoryId: string): void => {
		this.eventCategories.delete(categoryId)
	})

	// Event Types:
	public assignEventTypes = action((eventTypesFromDB: EventTypeFromDB[]): void => {
		eventTypesFromDB.forEach((eventType) => this.addEventType(eventType))
	})

	public addEventType = action((eventType: EventTypeFromDB): void => {
		if (this.eventTypes.has(eventType._id)) return
		this.eventTypes.set(eventType._id, eventType)
	})

	public editEventType = action((eventType: EventTypeFromDB): void => {
		if (this.eventTypes.has(eventType._id) === false) return
		this.eventTypes.set(eventType._id, eventType)
	})

	public removeEventType = action((eventTypeId: string): void => {
		this.eventTypes.delete(eventTypeId)
	})
}
