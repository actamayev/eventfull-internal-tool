import dayjs from "dayjs"
import { ColDef } from "ag-grid-community"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import EditButtonRenderer from "../../components/edit-button-renderer"
import { caseInsensitiveComparator, dateComparator } from "../comparators"
import DeleteButtonRenderer from "../../components/delete-button-renderer"

const eventTypesDashboardColumns: ColDef[] = [
	{ headerName: "Event Type", field: "eventType", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Description", field: "description", comparator: caseInsensitiveComparator, width: 300 },
	{ headerName: "Categories", field: "categories", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator, width: 151 },
	{ headerName: "Created By", field: "createdBy", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Edit", field: "edit", cellRenderer: EditButtonRenderer, width: 133 },
	{ headerName: "Delete", field: "delete", cellRenderer: DeleteButtonRenderer, width: 100 }
]

export default eventTypesDashboardColumns
