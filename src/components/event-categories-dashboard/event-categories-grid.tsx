import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import { useNavigate } from "react-router-dom"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { GridApi, RowDoubleClickedEvent, SizeColumnsToContentStrategy } from "ag-grid-community"
import Button from "../button"
import AppContext from "../../contexts/eventfull-it-context"
import createEventCategoriesArrayForGrid
	from "../../utils/event-categories/create-event-categories-array-for-grid"
import eventCategoriesDashboardColumns from "../../utils/event-categories/event-categories-dashboard-columns"
import useSetGridHeight from "../../hooks/set-grid-height"

function EventCategoriesGrid () {
	const appContext = useContext(AppContext)
	const gridRef = useRef<AgGridReact | null>(null)
	const navigate = useNavigate()
	const [rowData, setRowData] = useState<EventCategoriesGridRowData[]>([])
	const [gridApi, setGridApi] = useState<GridApi | null>(null)
	const [gridHeight, setGridHeight] = useState<string | number>("100%")
	useSetGridHeight(setGridHeight, gridApi, rowData.length)

	useEffect(() => {
		const disposeAutorun = autorun(() => {
			if (_.isNull(appContext.eventsData)) return
			const plainMap = toJS(appContext.eventsData.eventCategories)
			const eventCategoriesArray = createEventCategoriesArrayForGrid(plainMap)
			setRowData(eventCategoriesArray)
		})
		return () => disposeAutorun()
	}, [appContext.usersData?.usersMap])

	const autoSizeStrategy: SizeColumnsToContentStrategy = {
		type: "fitCellContents",
	}

	const onFilterTextBoxChanged = useCallback(() => {
		if (!gridRef.current) return

		const filterText = (document.getElementById("filter-text-box") as HTMLInputElement).value
		gridRef.current.api.updateGridOptions({ quickFilterText: filterText })
	}, [gridRef])

	const handleRowDoubleClicked = (user: RowDoubleClickedEvent) => {
		navigate(`/view-event-type/${user.data.eventTypeId}`)
	}

	return (
		<div className="flex-1">
			<div className="flex justify-between mb-2">
				<div className="flex-grow">
					<input
						type="text"
						id="filter-text-box"
						placeholder="Search Event Categories..."
						onInput={onFilterTextBoxChanged}
						className="p-2 border-2 border-gray-300 rounded-md w-1/6"
					/>
				</div>
				<div>
					<Button
						title="+ Add Event Category"
						onClick={() => navigate("/add-event-category")}
						colorClass="bg-blue-600"
						hoverClass="hover:bg-blue-700"
						className="rounded-md font-bold text-white p-2 border-2 border-blue-600 hover:border-blue-700"
					/>
				</div>
			</div>
			<div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
				<AgGridReact
					ref={gridRef}
					columnDefs={eventCategoriesDashboardColumns}
					rowData={rowData}
					onGridReady={(params) => setGridApi(params.api)}
					pagination={true}
					headerHeight={40}
					paginationPageSize={50}
					rowHeight={40}
					autoSizeStrategy={autoSizeStrategy}
					onRowDoubleClicked={handleRowDoubleClicked}
				/>
			</div>
		</div>
	)
}

export default observer(EventCategoriesGrid)
