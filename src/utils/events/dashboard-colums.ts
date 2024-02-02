import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import { ColDef } from "ag-grid-community"
import EditButtonRenderer from "../../components/dashboard/edit-event-button"

const dateComparator = (valueA: string, valueB: string): number => {
	// Parse the date strings using the custom format
	const format = "MMMM D, YYYY, [at] h:mmA"
	const dateA = dayjs(valueA, format)
	const dateB = dayjs(valueB, format)

	return dateA.diff(dateB)
}

const dashboardColumns: ColDef[] = [
	{ headerName: "Event Name", field: "eventName" },
	{ headerName: "Description", field: "eventDescription" },
	{ headerName: "Location", field: "address" },
	{ headerName: "Created By", field: "createdByUsername" },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator },
	{ headerName: "Last Updated At", field: "updatedAt", comparator: dateComparator },
	{
		headerName: "Edit",
		field: "edit",
		cellRenderer: EditButtonRenderer,
	}
]

export default dashboardColumns
