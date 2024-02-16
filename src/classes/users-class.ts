import { action, makeObservable, observable } from "mobx"

export default class UsersClass {
	public usersMap: Map<string, UserFromDB> = new Map()

	constructor() {
		makeObservable(this, {
			usersMap: observable,
		})
	}

	public contextForUser(userId: string): UserFromDB | undefined {
		return this.usersMap.get(userId)
	}

	public addUser = action((user: UserFromDB): void => {
		if (this.usersMap.has(user._id)) return
		this.usersMap.set(user._id, user)
	})
}
