import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Admin } from "./Pages/Admin"
import { EditCourse } from "./Components/EditCourse"

function App() {
	return (
		<Routes>
			<Route exact path='/admin' element={<Admin />} />
			<Route exact path='/course/:id' element={<EditCourse />} />
			<Route path='/' element={<Home />} />
		</Routes>
	)
}

export default App
