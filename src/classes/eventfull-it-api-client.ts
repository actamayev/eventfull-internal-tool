import AuthDataService from "../services/auth-data-service"
import EventsDataService from "../services/events-data-service"
import PersonalDataService from "../services/personal-data-service"
import UsersDataService from "../services/users-data-service"
import EventfullHttpClient from "./eventfull-it-http-client"

export default class EventfullITApiClient {
	public readonly httpClient: EventfullHttpClient
	public readonly authDataService: AuthDataService
	public readonly personalDataService: PersonalDataService
	public readonly eventsDataService: EventsDataService
	public readonly usersDataService: UsersDataService

	constructor() {
		this.httpClient = new EventfullHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
		this.personalDataService = new PersonalDataService(this.httpClient)
		this.eventsDataService = new EventsDataService(this.httpClient)
		this.usersDataService = new UsersDataService(this.httpClient)
	}
}
