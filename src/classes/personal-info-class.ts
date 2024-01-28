import _ from "lodash"
import { makeAutoObservable, runInAction } from "mobx"

export default class PersonalInfoClass {
	private _firstName: string | null = null
	private _lastName: string | null = null
	private _email?: string | null = null
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

	set lastName(lastName: string | null) {
		this._lastName = lastName
	}

	get lastName(): string | null {
		return this._lastName
	}

	get email(): string | null | undefined {
		return this._email
	}

	set email(email: string | null | undefined) {
		this._email = email
	}

	get username(): string | null {
		return this._username
	}

	set username(username: string | null) {
		this._username = username
	}

	public getPersonalDataFromStorage(): void {
		const storedFirstName = sessionStorage.getItem("First Name")
		const storedLastName = sessionStorage.getItem("Last Name")
		const storedUsername = sessionStorage.getItem("Username")
		const storedEmail = sessionStorage.getItem("Email")

		runInAction(() => {
			if (!_.isUndefined(storedFirstName)) this.firstName = storedFirstName
			if (!_.isUndefined(storedLastName)) this.lastName = storedLastName
			if (!_.isUndefined(storedUsername)) this.username = storedUsername
			if (!_.isUndefined(storedEmail)) this.email = storedEmail
		})
	}

	public savePersonalData(personalData: LoginSuccess): void {
		if (!_.isUndefined(personalData.firstName)) {
			this.firstName = personalData.firstName
			sessionStorage.setItem("First Name", personalData.firstName)
		}
		if (!_.isUndefined(personalData.lastName)) {
			this.lastName = personalData.lastName
			sessionStorage.setItem("Last Name", personalData.lastName)
		}
		if (!_.isUndefined(personalData.username)) {
			this.username = personalData.username
			sessionStorage.setItem("Username", personalData.username)
		}
		if (!_.isUndefined(personalData.email)) {
			this.email = personalData.email
			sessionStorage.setItem("Email", personalData.email)
		}
	}
}
