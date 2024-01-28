import _ from "lodash"
import { createContext } from "react"
import { makeAutoObservable, runInAction } from "mobx"
import AuthClass from "../classes/auth-class"
import EventfullITApiClient from "../classes/eventfull-it-api-client"
import PersonalInfoClass from "../classes/personal-info-class"

export class EventfullITContext {
	private _authClass = new AuthClass()
	private _personalData: PersonalInfoClass | null = null
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

	private getAllDataFromStorage(): void {
		this.getAuthDataFromStorage()
		if (_.isNull(this.authClass.accessToken)) return
		this.getPersonalDataFromStorage()
	}

	public getAuthDataFromStorage(): void {
		this.authClass.getAuthDataFromStorage()
		this.eventfullApiClient.httpClient.accessToken = this.authClass.accessToken
	}

	private getPersonalDataFromStorage(): void {
		if (_.isNull(this.personalData)) this.personalData = new PersonalInfoClass()
		this.personalData.getPersonalDataFromStorage()
	}

	public setDataAfterLogin(accessToken: string, userInfo: LoginSuccess): void {
		this.setAccessToken(accessToken)
		this.setPersonalData(userInfo)
	}

	private setPersonalData(userInfo: LoginSuccess): void {
		if (_.isNull(this.personalData)) this.personalData = new PersonalInfoClass()
		this.personalData.savePersonalData(userInfo)
	}

	private setAccessToken(accessToken: string): void {
		this.authClass.setAccessToken(accessToken)
		this.eventfullApiClient.httpClient.accessToken = accessToken
	}

	public logout(): void {
		localStorage.clear()
		sessionStorage.clear()
		runInAction(() => {
			this.authClass = new AuthClass()
			this.personalData = null
			this.eventfullApiClient = new EventfullITApiClient()
		})
	}
}

const AppContext = createContext(new EventfullITContext())
export default AppContext
