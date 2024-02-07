import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import { ColDef } from "ag-grid-community"
import { caseInsensitiveComparator, dateComparator } from "../comparators"

const usersDashboardColumns: ColDef[] = [
	{ headerName: "First Name", field: "firstName", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Last Name", field: "lastName", comparator: caseInsensitiveComparator, width: 300 },
	{ headerName: "Username", field: "username", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Email", field: "email", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Phone Number", field: "phoneNumber", comparator: caseInsensitiveComparator, width: 40 },
	{ headerName: "Number of friends", field: "numberOfFriends", width: 40 },
	{ headerName: "Last Login", field: "lastLogin", comparator: dateComparator, width: 40 },
	{ headerName: "Account Created", field: "createdAt", comparator: dateComparator, width: 40 },
]

export default usersDashboardColumns
