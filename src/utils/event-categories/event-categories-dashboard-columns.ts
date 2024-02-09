import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)
import { ColDef } from "ag-grid-community"
import { caseInsensitiveComparator, dateComparator } from "../comparators"

const eventCategoriesDashboardColumns: ColDef[] = [
	{ headerName: "Event Category", field: "eventCategory", comparator: caseInsensitiveComparator, width: 175 },
	{ headerName: "Description", field: "description", comparator: caseInsensitiveComparator, width: 300 },
	{ headerName: "Created At", field: "createdAt", comparator: dateComparator, width: 150 },
	{ headerName: "Created By", field: "createdBy", comparator: caseInsensitiveComparator, width: 150 },
]

export default eventCategoriesDashboardColumns
