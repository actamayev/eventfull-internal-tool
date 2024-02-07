import { makeObservable, observable } from "mobx"
import UserClass from "./user-class"

export default class UsersClass {
	public usersMap: Map<string, UserClass> = new Map()

	constructor() {
		makeObservable(this, {
			usersMap: observable,
		})
	}

	public contextForUser(userId: string): UserClass | undefined {
		const user = this.usersMap.get(userId)
		return user
	}

	public addUser(user: UserFromDB): void {
		if (this.usersMap.has(user._id)) return
		const newUser = new UserClass(user)
		this.usersMap.set(user._id, newUser)
	}
}
