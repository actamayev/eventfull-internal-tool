import UserClass from "../../classes/users/user-class"
import formatReadableDate from "../format-readable-date"

export default function createUsersArrayForGrid(usersData: Map<string, UserClass>): UserGridRowData[] {
	const usersArray = usersData instanceof Map
		? Array.from(usersData.values())
		: usersData

	return usersArray
		.map(user => ({
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			numberOfFriends: user.friends.length,
			lastLogin: user.loginHistory.length > 0
				? formatReadableDate(user.loginHistory[user.loginHistory.length - 1].loginTime)
				: "Never",
			createdAt: formatReadableDate(user.createdAt)
		}))
}
