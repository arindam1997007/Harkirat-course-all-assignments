import { useState } from "react"
import {
	MenuItem,
	Drawer as MuiDrawer,
	AppBar as MuiAppBar,
	Box,
	Toolbar,
	List,
	Typography,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useLocation, useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import PropTypes from "prop-types"
import LogoutIcon from "@mui/icons-material/Logout"
import { useLogout } from "../../Hooks/useLogout"

const drawerWidth = 240

const openedMixin = theme => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
})

const closedMixin = theme => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
})

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}))

export function Sidebar({ children, sidebarOptions }) {
	const { logout } = useLogout()
	const navigate = useNavigate()
	const [open, setOpen] = useState(true)
	const location = useLocation()

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const selected = sidebarOptions.find(option => {
		return option.url === location.pathname
	})

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div'>
						{selected?.name}
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{sidebarOptions.map(item => (
						<MenuItem
							key={item.name}
							sx={{
								display: "flex",
								height: 72,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							selected={selected?.id === item.id}
							onClick={() => navigate(item.url)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primary={item.name}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</MenuItem>
					))}
					<Divider />
					<MenuItem
						sx={{
							display: "flex",
							height: 72,
							justifyContent: open ? "initial" : "center",
							px: 2.5,
						}}
						onClick={logout}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : "auto",
								justifyContent: "center",
							}}
						>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
					</MenuItem>
				</List>
			</Drawer>
			<Box component='main' sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	)
}

Sidebar.propTypes = {
	sidebarOptions: PropTypes.array.isRequired,
	children: PropTypes.node,
}
