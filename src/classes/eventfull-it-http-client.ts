import _ from "lodash"
import axios, { AxiosInstance } from "axios"

export default class EventfullITHttpClient {
	public readonly http: AxiosInstance
	private _accessToken: string | null = null

	constructor() {
		this.http = axios.create({
			baseURL: process.env.REACT_APP_BASE_URL,
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				"authorization": this.accessToken
			}
		})
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	set accessToken(accessToken: string | null) {
		this._accessToken = accessToken
		if (!_.isNull(accessToken)) {
			this.http.defaults.headers["authorization"] = accessToken
		} else {
			delete this.http.defaults.headers["authorization"]
		}
	}
}
