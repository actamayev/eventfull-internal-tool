import _ from "lodash"
import { createContext } from "react"
import { makeAutoObservable, runInAction } from "mobx"
import AuthClass from "../classes/auth-class"
import UsersClass from "../classes/users-class"
import EventsClass from "../classes/events-class"
import PersonalInfoClass from "../classes/personal-info-class"
import EventfullITApiClient from "../classes/eventfull-it-api-client"

export class EventfullITContext {
	private _authClass = new AuthClass()
	private _personalData: PersonalInfoClass | null = null
	private _eventsData: EventsClass | null = null
	private _usersData: UsersClass | null = null
	public eventfullApiClient = new EventfullITApiClient()

	constructor() {
		makeAutoObservable(this)
		this.getAllDataFromStorage()
	}

	get authClass(): AuthClass {
		return this._authClass
	}

	set authClass(authClass: AuthClass) {
		this._authClass = authClass
	}

	get personalData(): PersonalInfoClass | null {
		return this._personalData
	}

	set personalData(personalData: PersonalInfoClass | null) {
		this._personalData = personalData
	}

	get eventsData(): EventsClass | null {
		return this._eventsData
	}

	set eventsData(eventsData: EventsClass | null) {
		this._eventsData = eventsData
	}

	get usersData(): UsersClass | null {
		return this._usersData
	}

	set usersData(usersData: UsersClass | null) {
		this._usersData = usersData
	}

	private getAllDataFromStorage(): void {
		this.getAuthDataFromStorage()
		if (_.isNull(this.authClass.accessToken)) return
		if (_.isNull(this.personalData)) this.personalData = new PersonalInfoClass()
		if (_.isNull(this.eventsData)) this.eventsData = new EventsClass()
		if (_.isNull(this.usersData)) this.usersData = new UsersClass()
		this.personalData.getUsernameFromStorage()
	}

	public getAuthDataFromStorage(): void {
		this.authClass.getAuthDataFromStorage()
		this.eventfullApiClient.httpClient.accessToken = this.authClass.accessToken
	}

	public setDataAfterLogin(accessToken: string, userInfo: PersonalInfo): void {
		this.setAccessToken(accessToken)
		this.setAllPersonalData(userInfo)
	}

	public setDataAfterOTPLogin(userInfo: OTPLoginPersonalInfo): void {
		this.setAccessToken(userInfo.accessToken)
		this.setPersonalDataAfterOTPLogin(userInfo)
	}

	public setUsername(username: string): void {
		if (_.isNull(this.personalData)) this.personalData = new PersonalInfoClass()
		this.personalData.username = username
		sessionStorage.setItem("username", username)
	}

	public setAllPersonalData(userInfo: PersonalInfo): void {
		if (_.isNull(this.personalData)) this.personalData = new PersonalInfoClass()
		this.personalData.savePersonalData(userInfo)
	}

	private setPersonalDataAfterOTPLogin(userInfo: OTPLoginPersonalInfo): void {
		if (_.isNull(this.personalData)) this.personalData = new PersonalInfoClass()
		this.personalData.savePersonalDataAfterOTPLogin(userInfo)
	}

	private setAccessToken(accessToken: string): void {
		this.authClass.setAccessToken(accessToken)
		this.eventfullApiClient.httpClient.accessToken = accessToken
	}

	public logout(): void {
		runInAction(() => {
			localStorage.clear()
			sessionStorage.clear()
			this.authClass = new AuthClass()
			this.personalData = null
			this.eventsData = null
			this.usersData = null
			this.eventfullApiClient = new EventfullITApiClient()
		})
	}
}

const AppContext = createContext(new EventfullITContext())
export default AppContext
