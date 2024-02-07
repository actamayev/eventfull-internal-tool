import dayjs from "dayjs"
import UserClass from "../../classes/users/user-class"

export default function createUsersArrayForGrid(usersData: Map<string, UserClass>): UserGridRowData[] {
	const usersArray = usersData instanceof Map
		? Array.from(usersData.values())
		: usersData

	return usersArray
		.map(user => ({
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			numberOfFriends: user.friends.length,
			lastLogin: user.loginHistory.length > 0
				? dayjs(user.loginHistory[0].loginTime).format("M/D/YY [at] h:mmA")
				: "Never",
			createdAt: dayjs(user.createdAt).format("M/D/YY [at] h:mmA")
		}))
}

export function formatReadableDate(date: Date): string {
	return dayjs(date).format("M/D/YY [at] h:mmA")
}
