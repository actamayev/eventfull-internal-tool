import { useMemo } from "react"
import AppContext, { EventfullITContext } from "./contexts/eventfull-it-context"

export default function StateManager ({ children } : { children: React.ReactNode }) {
	const sharedState = useMemo(() => new EventfullITContext(), [])

	return (
		<AppContext.Provider value = {sharedState}>
			{children}
		</AppContext.Provider>
	)
}
