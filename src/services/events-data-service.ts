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

	async editEvent(eventfullEventData: EventFromDB): Promise<AxiosResponse<UpdatedEventResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<UpdatedEventResponse | NonSuccessResponse>("/events/update-event", { eventfullEventData })
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
}
