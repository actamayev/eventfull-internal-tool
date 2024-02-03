import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import { useNavigate } from "react-router-dom"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { GridApi, GridReadyEvent, SizeColumnsToContentStrategy  } from "ag-grid-community"
import Button from "../button"
import AppContext from "../../contexts/eventfull-it-context"
import dashboardColumns from "../../utils/events/dashboard-colums"
import createEventsArrayForGrid from "../../utils/events/create-events-array-for-grid"

function EventsGrid () {
	const appContext = useContext(AppContext)
	const gridRef = useRef<AgGridReact | null>(null)
	const navigate = useNavigate()
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

	const autoSizeStrategy: SizeColumnsToContentStrategy = {
		type: "fitCellContents",
	}

	const onFilterTextBoxChanged = useCallback(() => {
		if (!gridRef.current) return

		const filterText = (document.getElementById("filter-text-box") as HTMLInputElement).value
		gridRef.current.api.updateGridOptions({ quickFilterText: filterText })
	}, [gridRef])

	return (
		<div className="flex-grow">
			<div className="flex justify-between mb-4">
				<div className="flex-grow">
					<input
						type="text"
						id="filter-text-box"
						placeholder="Search Events..."
						onInput={onFilterTextBoxChanged}
						className="p-2 border-2 border-gray-300 rounded-md w-1/6"
					/>
				</div>
				<div>
					<Button
						title="+ Add event"
						onClick={() => navigate("/add-event")}
						colorClass="bg-blue-400"
						hoverClass="hover:bg-blue-500"
						className="p-2 rounded-md font-bold"
					/>
				</div>
			</div>
			<div className="ag-theme-alpine" style={{ height: 1500, width: "100%" }}>
				<AgGridReact
					ref={gridRef}
					columnDefs={dashboardColumns}
					rowData={rowData}
					onGridReady={onGridReady}
					pagination={true}
					paginationPageSize={50}
					rowHeight={40}
					autoSizeStrategy={autoSizeStrategy}
				/>
			</div>
		</div>
	)
}

export default observer(EventsGrid)
