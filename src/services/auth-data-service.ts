import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class AuthDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async login(loginInformation: AuthCredentials): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>("/auth/login", { loginInformation })
	}
	// TOOD: Add logout, register
}
