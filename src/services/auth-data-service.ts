import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class AuthDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>("/auth/login", { loginInformation })
	}

	async register(registerInformation: RegisterCredentialsWithoutConfirmation): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>("/auth/register", { registerInformation })
	}

	async logout(): Promise<AxiosResponse<ErrorResponse>> {
		return await this.httpClient.http.post<ErrorResponse>("/auth/logout")
	}
}
