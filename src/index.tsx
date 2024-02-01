import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"
import App from "./App"
import "./styles/index.css"
import Layout from "./components/layout"
import StateManager from "./state-manager"

if (process.env.NODE_ENV === "production") disableReactDevTools()

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<StateManager>
				<Layout>

					<Routes>
						<Route path = "/*" element = {<App/>} />
					</Routes>
				</Layout>

			</StateManager>
		</BrowserRouter>
	</React.StrictMode>
)
