import _ from "lodash"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react"
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css"
import { useNavigate } from "react-router-dom"
import "ag-grid-community/styles/ag-theme-alpine.css"
import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { GridApi, RowDoubleClickedEvent, SizeColumnsToContentStrategy  } from "ag-grid-community"
import AppContext from "../../contexts/eventfull-it-context"
import createUsersArrayForGrid from "../../utils/users/create-users-array-for-grid"
import usersDashboardColumns from "../../utils/users/users-dashboard-columns"

function UsersGrid () {
	const appContext = useContext(AppContext)
	const gridRef = useRef<AgGridReact | null>(null)
	const navigate = useNavigate()
	const [rowData, setRowData] = useState<UserGridRowData[]>([])
	const [gridApi, setGridApi] = useState<GridApi | null>(null)
	const [gridHeight, setGridHeight] = useState<string | number>("100%")

	useEffect(() => {
		const disposeAutorun = autorun(() => {
			if (_.isNull(appContext.usersData)) return
			const plainMap = toJS(appContext.usersData.usersMap)
			const usersArray = createUsersArrayForGrid(plainMap)
			setRowData(usersArray)
		})
		return () => disposeAutorun()
	}, [appContext.usersData?.usersMap])

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

	const handleRowDoubleClicked = (user: RowDoubleClickedEvent) => {
		navigate(`/edit-user/${user.data.userId}`)
	}

	return (
		<div className="flex-grow">
			<div className="flex justify-between mb-2">
				<div className="flex-grow">
					<input
						type="text"
						id="filter-text-box"
						placeholder="Search Users..."
						onInput={onFilterTextBoxChanged}
						className="p-2 border-2 border-gray-300 rounded-md w-1/6"
					/>
				</div>
			</div>
			<div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
				<AgGridReact
					ref={gridRef}
					columnDefs={usersDashboardColumns}
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

export default observer(UsersGrid)
