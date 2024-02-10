import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import { ColDef } from "ag-grid-community"
import EditButtonRenderer from "../../components/edit-button-renderer"
import DeleteButtonRenderer from "../../components/delete-button-renderer"
import { caseInsensitiveComparator, dateComparator } from "../comparators"

const eventsDashboardColumns: ColDef[] = [
	{ headerName: "Event Name", field: "eventName", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Description", field: "eventDescription", comparator: caseInsensitiveComparator, width: 450 },
	{ headerName: "Location", field: "address", comparator: caseInsensitiveComparator, width: 450 },
	{ headerName: "Created By", field: "createdByUsername", comparator: caseInsensitiveComparator, width: 120 },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator, width: 151 },
	{ headerName: "Last Updated At", field: "updatedAt", comparator: dateComparator, width: 151 },
	{ headerName: "Edit", field: "edit", cellRenderer: EditButtonRenderer, width: 100 },
	{ headerName: "Delete", field: "delete", cellRenderer: DeleteButtonRenderer, width: 100 }
]

export default eventsDashboardColumns
