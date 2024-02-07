import _ from "lodash"
import { observer } from "mobx-react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import CardTemplate from "../components/card-template"
import AppContext from "../contexts/eventfull-it-context"
import useSetSingleUser from "../hooks/users/set-single-user"
import useRedirectUnknownUser from "../hooks/redirects/redirect-unknown-user"
import { formatReadableDate } from "../utils/events/create-events-array-for-grid"

function ViewUser() {
	useRedirectUnknownUser()
	const appContext = useContext(AppContext)

	const { userId } = useParams<{ userId: string }>()
	const retrievedEvent = useSetSingleUser(userId)

	if (
		_.isNull(appContext.authClass.accessToken) ||
		_.isNil(appContext.personalData?.username)
	) return null

	if (_.isUndefined(userId) || _.isUndefined(retrievedEvent)) {
		return <>This user does not exist</>
	}

	return (
		<CardTemplate title = "User Details">
			Username: {retrievedEvent.username}
			<div/>
			First Name: {retrievedEvent.firstName}
			<div/>
			Last Name: {retrievedEvent.lastName}
			<div/>
			{retrievedEvent.email && "Email: " + retrievedEvent.email}
			<div/>
			{retrievedEvent.phoneNumber && "Phone Number: " + retrievedEvent.phoneNumber}
			<div/>
			{retrievedEvent.username + " has " + retrievedEvent.friends.length + " friends: " +
				retrievedEvent.friends.map((friend) => friend.username).join(", ")}
			<div/>
			Account Created: {formatReadableDate(retrievedEvent.createdAt)}
			<div/>
			Last Login: {formatReadableDate(retrievedEvent.loginHistory[retrievedEvent.loginHistory.length - 1].loginTime)}
		</CardTemplate>
	)
}

export default observer(ViewUser)
