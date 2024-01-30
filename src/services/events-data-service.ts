import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class EventsDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async addEvent(eventfullEventData: CreatingEvent): Promise<AxiosResponse<SingleEventResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<SingleEventResponse | NonSuccessResponse>("/events/add-event", { eventfullEventData })
	}

	async getEvents(): Promise<AxiosResponse<EventsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<EventsResponse | ErrorResponse>("/events/get-events")
	}
}
