import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material"
import { createCourse } from "../../Service/course.service"
import { useReducer } from "react"

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

export const AddCourse = () => {
	const [formData, dispatchForm] = useReducer(formReducer, initialFormData)

	const handleChange = e => {
		const { name, value } = e.target
		dispatchForm({ type: "CHANGE", field: name, value })
	}

	const handleTogglePublished = () => {
		dispatchForm({ type: "TOGGLE_PUBLISHED" })
	}

	const handleReset = () => {
		dispatchForm({ type: "RESET" })
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			await createCourse(formData)
			handleReset()
		} catch (error) {
			console.log({ error })
		}
	}
	return (
		<Stack spacing={2}>
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
					value={formData.image}
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
				<Button
					type='submit'
					variant='contained'
					sx={{
						mt: 3,
						mb: 2,
						textTransform: "uppercase",
						display: "flex",
						ml: "auto",
					}}
				>
					{"Add Course"}
				</Button>
			</Box>
		</Stack>
	)
}
