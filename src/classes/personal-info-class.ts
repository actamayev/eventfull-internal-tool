import _ from "lodash"
import { makeAutoObservable } from "mobx"

export default class PersonalInfoClass {
	private _firstName: string | null = null
	private _lastName: string | null = null
	private _email: string | null = null
	private _username: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get firstName(): string | null {
		return this._firstName
	}

	set firstName(firstName: string | null) {
		this._firstName = firstName
	}

	get lastName(): string | null {
		return this._lastName
	}

	set lastName(lastName: string | null) {
		this._lastName = lastName
	}

	get email(): string | null {
		return this._email
	}

	set email(email: string | null) {
		this._email = email
	}

	get username(): string | null {
		return this._username
	}

	set username(username: string | null) {
		this._username = username
	}

	public savePersonalData(personalData: PersonalInfo): void {
		if (!_.isUndefined(personalData.firstName)) this.firstName = personalData.firstName
		if (!_.isUndefined(personalData.lastName)) this.lastName = personalData.lastName
		if (!_.isUndefined(personalData.username)) {
			this.username = personalData.username
			sessionStorage.setItem("username", personalData.username)
		}
		if (!_.isUndefined(personalData.email)) this.email = personalData.email
	}

	public savePersonalDataAfterOTPLogin(personalData: OTPLoginPersonalInfo): void {
		if (!_.isUndefined(personalData.firstName)) this.firstName = personalData.firstName
		if (!_.isUndefined(personalData.lastName)) this.lastName = personalData.lastName
		if (!_.isUndefined(personalData.email)) this.email = personalData.email
	}

	public getUsernameFromStorage(): void {
		const username = sessionStorage.getItem("username")
		if (!_.isNull(username)) this.username = username
	}
}
