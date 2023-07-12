import { useEffect, useState } from "react"
import { getAllCourses } from "../../Service/course.service"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material"

const columns = [
	{ id: "id", label: "ID", minWidth: 170 },
	{ id: "title", label: "Title", minWidth: 170 },
	{ id: "description", label: "Description", minWidth: 100 },
	{
		id: "price",
		label: "Price",
		minWidth: 170,
		format: value => "₹ " + value,
	},
	{
		id: "image",
		label: "Image",
		minWidth: 170,
	},
	{
		id: "published",
		label: "Published",
		minWidth: 170,
		format: value => (value ? <CheckIcon /> : <CloseIcon />),
	},
]

export const Courses = () => {
	const [courses, setCourses] = useState([])
	useEffect(() => {
		const retrieveCourses = async () => {
			const res = await getAllCourses()
			setCourses(res.data)
		}
		retrieveCourses()
	}, [])

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
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
	)
}
