import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import { useNavigate } from "react-router-dom"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { GridApi, RowDoubleClickedEvent, SizeColumnsToContentStrategy  } from "ag-grid-community"
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
	const [gridHeight, setGridHeight] = useState<string | number>("100%")

	useEffect(() => {
		const disposeAutorun = autorun(() => {
			if (_.isNull(appContext.eventsData)) return
			const plainMap = toJS(appContext.eventsData.eventsMap)
			const eventsArray = createEventsArrayForGrid(plainMap)
			setRowData(eventsArray)
		})
		return () => disposeAutorun()
	}, [appContext.eventsData?.eventsMap])

	useEffect(() => {
		const rowHeight = 40 // Your row height
		const headerHeight = 40
		const paginationPanelHeight = 70 // Approximate pagination panel height
		const totalRowsHeight = rowData.length * rowHeight
		const totalGridHeight = headerHeight + totalRowsHeight + paginationPanelHeight

		// Set maximum height if total height is greater than a certain value
		const maxHeight = 1500
		setGridHeight(Math.min(totalGridHeight, maxHeight))
	}, [gridApi, rowData])

	const autoSizeStrategy: SizeColumnsToContentStrategy = {
		type: "fitCellContents",
	}

	const onFilterTextBoxChanged = useCallback(() => {
		if (!gridRef.current) return

		const filterText = (document.getElementById("filter-text-box") as HTMLInputElement).value
		gridRef.current.api.updateGridOptions({ quickFilterText: filterText })
	}, [gridRef])

	const adjustDeleteColumnWidth = (newWidth: number) => {
		if (_.isNull(gridApi)) return
		gridApi.setColumnWidth("delete", newWidth)
	}

	const handleRowDoubleClicked = (event: RowDoubleClickedEvent) => {
		navigate(`/edit-event/${event.data.eventId}`)
	}

	return (
		<div className="flex-grow">
			<div className="flex justify-between mb-2">
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
						colorClass="bg-blue-600"
						hoverClass="hover:bg-blue-700"
						className="rounded-md font-bold text-white p-2 border-2 border-blue-600 hover:border-blue-700"
					/>
				</div>
			</div>
			<div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
				<AgGridReact
					ref={gridRef}
					columnDefs={dashboardColumns}
					rowData={rowData}
					onGridReady={(params) => setGridApi(params.api)}
					pagination={true}
					headerHeight={40}
					paginationPageSize={50}
					rowHeight={40}
					autoSizeStrategy={autoSizeStrategy}
					context={{ adjustDeleteColumnWidth }}
					onRowDoubleClicked={handleRowDoubleClicked}
				/>
			</div>
		</div>
	)
}

export default observer(EventsGrid)
