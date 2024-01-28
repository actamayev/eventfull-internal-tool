import _ from "lodash"
import { makeAutoObservable } from "mobx"

export default class AuthClass {
	private _accessToken: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	set accessToken(accessToken: string | null) {
		this._accessToken = accessToken
	}

	public setAccessToken(accessToken: string | null): void {
		this.accessToken = accessToken
		if (!_.isNull(accessToken)) localStorage.setItem("Access Token", accessToken)
	}

	public getAuthDataFromStorage(): void {
		const storedAccessToken = localStorage.getItem("Access Token")
		if (!_.isNull(storedAccessToken)) this.accessToken = storedAccessToken
	}
}
