import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
	Typography,
	Snackbar,
	Alert,
	Slide,
} from "@mui/material"
import { editCourse as editCourseService } from "../../Service/course.service"
import { useReducer, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { editCourse } from "../../Atom/course.atom"

const initialFormData = {
	title: "",
	description: "",
	price: "",
	imageLink: "",
	published: false,
}

function formReducer(state, action) {
	switch (action.type) {
		case "CHANGE":
			return { ...state, [action.field]: action.value }
		case "TOGGLE_PUBLISHED":
			return { ...state, published: !state.published }
		case "RESET":
			return initialFormData
		default:
			return initialFormData
	}
}

export const EditCourse = () => {
	let { id: courseId } = useParams()
	const navigate = useNavigate()
	console.log({ courseId })
	const courseData = useRecoilValue(editCourse)
	console.log({ courseData })
	const [formData, dispatchForm] = useReducer(formReducer, courseData)
	const [successOpen, setSuccessOpen] = useState(false)

	const handleChange = e => {
		const { name, value } = e.target
		dispatchForm({ type: "CHANGE", field: name, value })
	}

	const handleTogglePublished = () => {
		dispatchForm({ type: "TOGGLE_PUBLISHED" })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			await editCourseService({ ...formData, courseId })
			setSuccessOpen(true)
			// handleReset()
		} catch (error) {
			console.log({ error })
		}
	}

	const handleCancel = () => {
		navigate(-1)
	}

	const onSuccessClose = () => {
		setSuccessOpen(false)
	}

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={successOpen}
				autoHideDuration={1500}
				onClose={onSuccessClose}
				TransitionComponent={props => <Slide {...props} direction='down' />}
			>
				<Alert severity='success' sx={{ width: "100%" }}>
					Successfully Updated
				</Alert>
			</Snackbar>
			<Stack spacing={2}>
				<Typography variant='h2'>Edit Course </Typography>
				<Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Title'
						name='title'
						value={formData.title}
						onChange={handleChange}
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						label='Description'
						name='description'
						value={formData.description}
						onChange={handleChange}
					/>
					<TextField
						margin='normal'
						type='number'
						required
						fullWidth
						label='Price'
						name='price'
						value={formData.price}
						onChange={handleChange}
						inputProps={{ min: 0 }}
					/>
					<TextField
						margin='normal'
						fullWidth
						label='Image URL'
						name='imageLink'
						value={formData.imageLink}
						onChange={handleChange}
						inputProps={{ pattern: `^\\S+\\.\\S+$` }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								name='published'
								checked={formData.published}
								onChange={handleTogglePublished}
							/>
						}
						label='Published'
					/>
					<Stack
						direction='row'
						spacing={2}
						sx={{
							mt: 3,
							mb: 2,
						}}
					>
						<Button
							type='button'
							onClick={handleCancel}
							color='error'
							variant='contained'
							sx={{
								textTransform: "uppercase",
								display: "flex",
								ml: "auto",
							}}
						>
							{"Cancel"}
						</Button>

						<Button
							type='submit'
							variant='contained'
							sx={{
								textTransform: "uppercase",
								display: "flex",
							}}
						>
							{"Submit"}
						</Button>
					</Stack>
				</Box>
			</Stack>
		</>
	)
}
