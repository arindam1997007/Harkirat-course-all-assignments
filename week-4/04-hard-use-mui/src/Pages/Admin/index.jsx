import { Outlet } from "react-router-dom"
import {
	AdminPanelSettings as AdminPanelSettingsIcon,
	BookmarkAdd as BookmarkAddIcon,
	LocalLibrary as LocalLibraryIcon,
} from "@mui/icons-material"
import { Sidebar } from "../../Components/Sidebar"

const sidebarOptions = [
	{
		id: 1,
		name: "Create Admin",
		icon: <AdminPanelSettingsIcon />,
		url: "/admin",
	},
	{
		id: 2,
		name: "Add Course",
		icon: <BookmarkAddIcon />,
		url: "/admin/add-course",
	},
	{
		id: 3,
		name: "All Courses",
		icon: <LocalLibraryIcon />,
		url: "/admin/course",
	},
]

export function Admin() {
	return (
		<Sidebar sidebarOptions={sidebarOptions}>
			<Outlet />
		</Sidebar>
	)
}
