import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { ColDef } from "ag-grid-community"
import { useState, useEffect, useContext } from "react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import AppContext from "../contexts/eventfull-it-context"
import createEventsArrayForGrid from "../utils/events/create-events-array-for-grid"

function EventsGrid () {
	const appContext = useContext(AppContext)
	const [rowData, setRowData] = useState<GridRowData[]>([])

	const columns: ColDef[] = [
		{ headerName: "Event Name", field: "eventName" },
		{ headerName: "Description", field: "eventDescription" },
		{ headerName: "Location", field: "address" },
		{ headerName: "Created By", field: "createdByUsername" }
	]

	useEffect(() => {
		const disposeAutorun = autorun(() => {
			if (_.isNull(appContext.eventsData)) return
			const plainMap = toJS(appContext.eventsData.eventsMap)
			const eventsArray = createEventsArrayForGrid(plainMap)
			setRowData(eventsArray)
		})
		return () => disposeAutorun()

	}, [appContext.eventsData?.eventsMap])

	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: "100%" }}>
			<AgGridReact
				columnDefs={columns}
				rowData={rowData}
				pagination={true}
				paginationPageSize={25}
				rowHeight={30}
			/>
		</div>
	)
}

export default observer(EventsGrid)
