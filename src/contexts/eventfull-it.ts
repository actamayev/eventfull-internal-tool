import { createContext } from "react"
import { makeAutoObservable } from "mobx"

export class EventfullITContext {
	constructor() {
		makeAutoObservable(this)
	}

}

const AppContext = createContext(new EventfullITContext())
export default AppContext
