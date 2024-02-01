import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useState, useEffect, useContext } from "react"
import { GridApi, GridReadyEvent, SizeColumnsToContentStrategy  } from "ag-grid-community"
import AppContext from "../contexts/eventfull-it-context"
import dashboardColumns from "../utils/events/dashboard-colums"
import createEventsArrayForGrid from "../utils/events/create-events-array-for-grid"

function EventsGrid () {
	const appContext = useContext(AppContext)
	const [rowData, setRowData] = useState<GridRowData[]>([])
	const [gridApi, setGridApi] = useState<GridApi | null>(null)

	useEffect(() => {
		if (!_.isNull(gridApi) && !_.isEmpty(rowData)) {
		// Filter out any undefined values
			const columnFields = dashboardColumns.map(col => col.field).filter(field => field !== undefined) as string[]

			gridApi.sizeColumnsToFit() // Optional: Sizes columns to fit the grid width
			gridApi.autoSizeColumns(columnFields) // Autosizes columns to fit content
		}
	}, [gridApi, rowData])

	useEffect(() => {
		const disposeAutorun = autorun(() => {
			if (_.isNull(appContext.eventsData)) return
			const plainMap = toJS(appContext.eventsData.eventsMap)
			const eventsArray = createEventsArrayForGrid(plainMap)
			setRowData(eventsArray)
		})
		return () => disposeAutorun()
	}, [appContext.eventsData?.eventsMap])

	const onGridReady = (params: GridReadyEvent) => {
		setGridApi(params.api)
		// Additional logic for when the grid is ready
	}

	const autoSizeStrategy: SizeColumnsToContentStrategy  = {
		type: "fitCellContents",
	}

	return (
		<div className="ag-theme-alpine" style={{ height: 900, width: "100%" }}>
			<AgGridReact
				columnDefs={dashboardColumns}
				rowData={rowData}
				onGridReady={onGridReady}
				pagination={true}
				paginationPageSize={25}
				rowHeight={30}
				autoSizeStrategy={autoSizeStrategy}
			/>
		</div>
	)
}

export default observer(EventsGrid)
