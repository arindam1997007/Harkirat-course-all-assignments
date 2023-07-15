import { Sidebar } from "../../Components/Sidebar"
import { useState } from "react"
import {
	AdminPanelSettings as AdminPanelSettingsIcon,
	BookmarkAdd as BookmarkAddIcon,
	LocalLibrary as LocalLibraryIcon,
} from "@mui/icons-material"
import { AdminSignUp } from "../../Components/SignUp/adminSignUp"
import { Courses } from "../../Components/Courses"
import { AddCourse } from "../../Components/AddCourse"

const sidebarOptions = [
	{ id: 1, name: "Create Admin", icon: <AdminPanelSettingsIcon /> },
	{ id: 2, name: "Add Course", icon: <BookmarkAddIcon /> },
	{ id: 3, name: "All Courses", icon: <LocalLibraryIcon /> },
]

export const Admin = () => {
	const [selectedOption, setSelectedOption] = useState(sidebarOptions[2])

	const renderChild = () => {
		switch (selectedOption.id) {
			case 1:
				return <AdminSignUp />
			case 2:
				return <AddCourse />
			case 3:
				return <Courses />
			default:
				break
		}
	}

	return (
		<>
			<Sidebar
				sidebarOptions={sidebarOptions}
				selected={selectedOption}
				setSelected={setSelectedOption}
			>
				{renderChild()}
			</Sidebar>
		</>
	)
}
