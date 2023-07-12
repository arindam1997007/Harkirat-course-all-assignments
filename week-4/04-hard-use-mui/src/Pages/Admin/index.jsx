import { Sidebar } from "../../Components/Sidebar"
import { useState } from "react"
import {
	AdminPanelSettings as AdminPanelSettingsIcon,
	BookmarkAdd as BookmarkAddIcon,
	LocalLibrary as LocalLibraryIcon,
} from "@mui/icons-material"
import { AdminSignUp } from "../../Components/SignUp/adminSignUp"

const sidebarOptions = [
	{ id: 1, name: "Create Admin", icon: <AdminPanelSettingsIcon /> },
	{ id: 2, name: "Add Course", icon: <BookmarkAddIcon /> },
	{ id: 3, name: "All Courses", icon: <LocalLibraryIcon /> },
]

export const Admin = () => {
	const [selectedOption, setSelectedOption] = useState(sidebarOptions[2])
	return (
		<>
			<Sidebar
				sidebarOptions={sidebarOptions}
				selected={selectedOption}
				setSelected={setSelectedOption}
			>
				<AdminSignUp />
			</Sidebar>
		</>
	)
}
