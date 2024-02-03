import _ from "lodash"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import { ColDef } from "ag-grid-community"
import EditButtonRenderer from "../../components/dashboard/edit-event-button"
import DeleteButtonRenderer from "../../components/dashboard/delete-event-button"

const dateComparator = (valueA: string, valueB: string): number => {
	// Parse the date strings using the custom format
	const format = "MMMM D, YYYY, [at] h:mmA"
	const dateA = dayjs(valueA, format)
	const dateB = dayjs(valueB, format)

	return dateA.diff(dateB)
}

const caseInsensitiveComparator = (valueA: string | null, valueB: string | null): number => {
	if (_.isNull(valueA) && _.isNull(valueB)) {
		return 0
	}
	if (_.isNull(valueA)) return -1
	if (_.isNull(valueB)) return 1
	return valueA.toLowerCase().localeCompare(valueB.toLowerCase())
}

const dashboardColumns: ColDef[] = [
	{ headerName: "Event Name", field: "eventName", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Description", field: "eventDescription", comparator: caseInsensitiveComparator, width: 300 },
	{ headerName: "Location", field: "address", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Created By", field: "createdByUsername", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator, width: 40 },
	{ headerName: "Last Updated At", field: "updatedAt", comparator: dateComparator, width: 40 },
	{ headerName: "Edit", field: "edit", cellRenderer: EditButtonRenderer, width: 100 },
	{ headerName: "Delete", field: "delete", cellRenderer: DeleteButtonRenderer, width: 100 }
]

export default dashboardColumns
