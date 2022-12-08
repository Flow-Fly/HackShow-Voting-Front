import { Route, Routes } from "react-router-dom"
import "./App.css"
import Main from "./pages/Home"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Main />}></Route>
			</Routes>
		</>
	)
}

export default App
