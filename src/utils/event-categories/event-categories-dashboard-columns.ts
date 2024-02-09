import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import { ColDef } from "ag-grid-community"
import { caseInsensitiveComparator, dateComparator } from "../comparators"

const eventCategoriesDashboardColumns: ColDef[] = [
	// TODO: In the DB, change the name of the column from "name" to "eventType"
	{ headerName: "Event Category", field: "eventCategory", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Description", field: "description", comparator: caseInsensitiveComparator, width: 300 },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator, width: 150 },
	// TODO: Add this:
	// { headerName: "Created By", field: "createdBy", comparator: caseInsensitiveComparator, width: 150 },
]

export default eventCategoriesDashboardColumns
