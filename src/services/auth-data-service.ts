import { AxiosResponse } from "axios"
import EventfullITHttpClient from "../classes/eventfull-it-http-client"

export default class AuthDataService {
	constructor(private readonly httpClient: EventfullITHttpClient) {
	}

	async login(loginInformation: LoginCredentials): Promise<AxiosResponse<LoginSuccess | NonSuccessResponse>> {
		return await this.httpClient.http.post<LoginSuccess | NonSuccessResponse>("/auth/login", { loginInformation })
	}

	async loginWithOTP(otpLoginInformation: OTPCredentials): Promise<AxiosResponse<OTPLoginPersonalInfo | NonSuccessResponse>> {
		return await this.httpClient.http.post<OTPLoginPersonalInfo | NonSuccessResponse>("/auth/otp-login", { otpLoginInformation })
	}

	async addAdmin(
		initialAdminRegisterInformation: InitialAdminRegisterInformation
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>("/auth/add-admin", { initialAdminRegisterInformation })
	}

	async finishAdminRegistration(
		secondaryAdminRegisterInformation: SecondaryAdminRegisterInformationWithoutConfirmation
	): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>("/auth/finish-admin-registration", { secondaryAdminRegisterInformation })
	}

	async logout(): Promise<AxiosResponse<SuccessResponse | ErrorResponse>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponse>("/auth/logout")
	}
}
