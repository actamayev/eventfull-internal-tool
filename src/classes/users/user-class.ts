import { makeAutoObservable } from "mobx"

export default class UserClass {
	constructor(userData: UserFromDB) {
		makeAutoObservable(this)
		this._id = userData._id
		this.firstName = userData.firstName
		this.lastName = userData.lastName
		this.email = userData.email
		this.phoneNumber = userData.phoneNumber
		this.friends = userData.friends
		this.username = userData.username
		this.loginHistory = userData.loginHistory

		this.createdAt = userData.createdAt
		this.updatedAt = userData.updatedAt
	}

	public _id: string
	public firstName: string
	public lastName?: string
	public email?: string
	public phoneNumber?: string
	public friends: SocialDataWithTimestamp[]
	public username?: string
	public loginHistory: LoginHistory[]

	public createdAt: Date
	public updatedAt: Date
}
