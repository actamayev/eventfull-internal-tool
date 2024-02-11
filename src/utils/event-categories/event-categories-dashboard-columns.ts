import dayjs from "dayjs"
import { ColDef } from "ag-grid-community"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import EditButtonRenderer from "../../components/edit-button-renderer"
import { caseInsensitiveComparator, dateComparator } from "../comparators"
import DeleteButtonRenderer from "../../components/delete-button-renderer"

const eventCategoriesDashboardColumns: ColDef[] = [
	{ headerName: "Event Category", field: "eventCategory", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Description", field: "description", comparator: caseInsensitiveComparator, width: 700 },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator, width: 158 },
	{ headerName: "Created By", field: "createdBy", comparator: caseInsensitiveComparator, width: 150 },
	{ headerName: "Edit", field: "edit", cellRenderer: EditButtonRenderer, width: 161 },
	{ headerName: "Delete", field: "delete", cellRenderer: DeleteButtonRenderer, width: 100 }
]

export default eventCategoriesDashboardColumns
