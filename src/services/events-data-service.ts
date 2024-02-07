import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class EventsDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async addEvent(
		eventfullEventData: CreatingEvent,
		numberOfImages: number
	): Promise<AxiosResponse<NewEventResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<NewEventResponse | NonSuccessResponse>(
			"/events/add-event", { eventfullEventData, numberOfImages }
		)
	}

	async editEvent(
		eventfullEventData: EventFromDB,
		numberOfImages: number
	): Promise<AxiosResponse<UpdatedEventResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<UpdatedEventResponse | NonSuccessResponse>(
			"/events/update-event", { eventfullEventData, numberOfImages }
		)
	}

	async getEvents(): Promise<AxiosResponse<EventsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<EventsResponse | ErrorResponse>("/events/get-events")
	}

	async getEventById(eventId: string): Promise<AxiosResponse<SingleEventResponse | ErrorResponses>> {
		return await this.httpClient.http.get<SingleEventResponse | ErrorResponses>(`/events/get-event/${eventId}`)
	}

	async deleteEvent(eventId: string): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.delete<SuccessResponse | ErrorResponses>(`/events/delete-event/${eventId}`)
	}

	async addEventImages(eventId: string, imageURLs: ImageURLs[]): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(`/events/add-image-urls/${eventId}`, { imageURLs })
	}

	async retrieveEventTypes(): Promise<AxiosResponse<EventTypesResponse | ErrorResponse>> {
		return await this.httpClient.http.get<EventTypesResponse | ErrorResponse>("/events/get-event-types")
	}

	async retrieveEventCategories(): Promise<AxiosResponse<EventCategoriesResponse | ErrorResponse>> {
		return await this.httpClient.http.get<EventCategoriesResponse | ErrorResponse>("/events/get-event-categories")
	}
}
