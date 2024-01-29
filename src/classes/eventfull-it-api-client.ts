import AuthDataService from "../services/auth-data-service"
import PersonalDataService from "../services/personal-data-service"
import EventfullHttpClient from "./eventfull-it-http-client"

export default class EventfullITApiClient {
	public readonly httpClient: EventfullHttpClient
	public readonly authDataService: AuthDataService
	public readonly personalDataService: PersonalDataService

	constructor() {
		this.httpClient = new EventfullHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
		this.personalDataService = new PersonalDataService(this.httpClient)
	}
}
