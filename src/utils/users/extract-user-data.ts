import UserClass from "../../classes/users/user-class"

export default function extractUserData(userClass: UserClass): UserFromDB {
	return {
		_id: userClass._id,
		createdAt: userClass.createdAt,
		email: userClass.email,
		firstName: userClass.firstName,
		lastName: userClass.lastName,
		loginHistory: userClass.loginHistory,
		phoneNumber: userClass.phoneNumber,
		username: userClass.username,
		friends: userClass.friends,
		updatedAt: userClass.updatedAt
	}
}
