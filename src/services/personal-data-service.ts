import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class PersonalDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async retrievePersonalData(): Promise<AxiosResponse<PersonalInfoResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PersonalInfoResponse | ErrorResponse>("/personal-info/retrieve-personal-data")
	}
}
