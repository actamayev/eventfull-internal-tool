import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class EventsDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async addEvent(newEvent: CreatingEvent): Promise<AxiosResponse<NewEventResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<NewEventResponse | NonSuccessResponse>("/events/add-event", { newEvent })
	}
}
