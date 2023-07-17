import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"
import { EditCourse } from "./Components/EditCourse"
import { Courses } from "./Components/Courses"
import { AdminSignUp } from "./Components/SignUp/adminSignUp"
import { AddCourse } from "./Components/AddCourse"
import { Admin } from "./Pages/Admin/index"

function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/admin' element={<Admin />}>
				<Route index element={<AdminSignUp />} />
				<Route exact path='course' element={<Courses />} />
				<Route exact path='add-course' element={<AddCourse />} />
				<Route exact path='course/:id' element={<EditCourse />} />
			</Route>
		</Routes>
	)
}

export default App
