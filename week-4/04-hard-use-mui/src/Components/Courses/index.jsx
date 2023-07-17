import { useEffect, useState } from "react"
import { getAllCourses } from "../../Service/course.service"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import {
	Check as CheckIcon,
	Close as CloseIcon,
	MenuBook as MenuBookIcon,
} from "@mui/icons-material"
import { Alert, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"

const columns = [
	{ id: "id", label: "ID", minWidth: 50 },
	{
		id: "imageLink",
		label: "",
		minWidth: 50,
		format: value =>
			value ? (
				<Box
					component='img'
					src={value}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null // prevents looping
						currentTarget.src = <MenuBookIcon />
					}}
					alt='course image'
					loading='lazy'
					sx={{
						height: 50,
						width: 50,
						objectFit: "cover",
					}}
				/>
			) : (
				<MenuBookIcon />
			),
	},
	{ id: "title", label: "Title", minWidth: 170 },
	{ id: "description", label: "Description", minWidth: 100 },
	{
		id: "price",
		label: "Price",
		minWidth: 170,
		format: value => "₹ " + value,
	},

	{
		id: "published",
		label: "Published",
		minWidth: 170,
		format: value => (value ? <CheckIcon /> : <CloseIcon />),
	},
]

export const Courses = () => {
	const navigate = useNavigate()
	const [error, setError] = useState({ open: false })

	const [courses, setCourses] = useState([])
	useEffect(() => {
		const retrieveCourses = async () => {
			try {
				const res = await getAllCourses()

				setCourses(res?.data || [])
				setError({ open: false })
			} catch (error) {
				setError({ open: true, message: error.message })
				setTimeout(() => {
					navigate("/")
				}, [1500])
				console.log({ error })
			}
		}
		retrieveCourses()
	}, [navigate])

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={error.open}
				autoHideDuration={1500}
				TransitionComponent={props => <Slide {...props} direction='down' />}
			>
				<Alert severity='error' sx={{ width: "100%" }}>
					{error.message}
				</Alert>
			</Snackbar>
			<Paper sx={{ width: "100%" }}>
				<TableContainer>
					<Table stickyHeader aria-label='sticky table'>
						<TableHead>
							<TableRow>
								{columns.map(column => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
										sx={{ fontWeight: 600, fontSize: "1.25rem" }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{courses.map((row, index) => {
								return (
									<TableRow
										hover
										role='checkbox'
										tabIndex={-1}
										key={row._id}
										sx={{ cursor: "pointer" }}
										onClick={() => {
											navigate(`/course/${row._id}`)
										}}
									>
										{columns.map(column => {
											if (column.id === "id")
												return (
													<TableCell key={column.id} align={column.align}>
														{index + 1}
													</TableCell>
												)

											const value = row[column.id] || ""
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format ? column.format(value) : value}
												</TableCell>
											)
										})}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	)
}
