import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { AgGridReact } from "ag-grid-react"
import { GridApi } from "ag-grid-community"
import "ag-grid-community/styles/ag-grid.css"
import { useNavigate } from "react-router-dom"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import Button from "../button"
import { isErrorResponses } from "../../utils/type-checks"
import useSetGridHeight from "../../hooks/set-grid-height"
import AppContext from "../../contexts/eventfull-it-context"
import eventTypesDashboardColumns from "../../utils/event-types/event-types-dashboard-columns"
import createEventTypesArrayForGrid from "../../utils/event-types/create-event-types-array-for-grid"

function EventTypesGrid () {
	const appContext = useContext(AppContext)
	const gridRef = useRef<AgGridReact | null>(null)
	const navigate = useNavigate()
	const [rowData, setRowData] = useState<EventTypesGridRowData[]>([])
	const [gridApi, setGridApi] = useState<GridApi | null>(null)
	const [gridHeight, setGridHeight] = useState<string | number>("100%")
	useSetGridHeight(setGridHeight, gridApi, rowData.length)

	useEffect(() => {
		const disposeAutorun = autorun(() => {
			if (_.isNull(appContext.eventsData)) return
			const plainMap = toJS(appContext.eventsData.eventTypes)
			const eventTypesArray = createEventTypesArrayForGrid(plainMap)
			setRowData(eventTypesArray)
		})
		return () => disposeAutorun()
	}, [appContext.eventsData?.eventTypes])

	const adjustDeleteColumnWidth = (newWidth: number) => {
		if (_.isNull(gridApi)) return
		gridApi.setColumnWidth("delete", newWidth)
	}

	const onFilterTextBoxChanged = useCallback(() => {
		if (!gridRef.current) return

		const filterText = (document.getElementById("filter-text-box") as HTMLInputElement).value
		gridRef.current.api.updateGridOptions({ quickFilterText: filterText })
	}, [gridRef])

	const handleConfirmDelete = async (e: React.MouseEvent<HTMLButtonElement>, eventTypeId: string) => {
		try {
			e.preventDefault()
			const response = await appContext.eventfullApiClient.eventsDataService.deleteEventType(eventTypeId)
			if (!_.isEqual(response.status, 200) || isErrorResponses(response.data)) {
				console.error(response)
				return
			}
			appContext.eventsData?.removeEventType(eventTypeId)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="flex-1">
			<div className="flex justify-between mb-2">
				<div className="flex-grow">
					<input
						type="text"
						id="filter-text-box"
						placeholder="Search Event Types..."
						onInput={onFilterTextBoxChanged}
						className="p-2 border-2 border-gray-300 rounded-md w-1/6"
					/>
				</div>
				<div>
					<Button
						title="+ Add Event Type"
						onClick={() => navigate("/add-event-type")}
						colorClass="bg-blue-600"
						hoverClass="hover:bg-blue-700"
						className="rounded-md font-bold text-white p-2 border-2 border-blue-600 hover:border-blue-700"
					/>
				</div>
			</div>
			<div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
				<AgGridReact
					ref={gridRef}
					columnDefs={eventTypesDashboardColumns}
					rowData={rowData}
					onGridReady={(params) => setGridApi(params.api)}
					pagination={true}
					headerHeight={40}
					paginationPageSize={50}
					rowHeight={40}
					context={{
						adjustDeleteColumnWidth,
						handleConfirmDelete,
						whatIsThis: "Event Type",
						getNavigationPath: (id: string) => `/edit-event-type/${id}`
					}}
					onRowDoubleClicked={(eventType) => navigate(`/edit-event-type/${eventType.data.id}`)}
				/>
			</div>
		</div>
	)
}

export default observer(EventTypesGrid)
