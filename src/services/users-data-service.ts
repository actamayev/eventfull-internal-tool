import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class UsersDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async getUsersEvents(): Promise<AxiosResponse<UsersResponse | ErrorResponse>> {
		return await this.httpClient.http.get<UsersResponse | ErrorResponse>("/users/get-users")
	}

	async getUserById(userId: string): Promise<AxiosResponse<SingleUserResponse | ErrorResponses>> {
		return await this.httpClient.http.get<SingleUserResponse | ErrorResponses>(`/users/get-user/${userId}`)
	}
}
