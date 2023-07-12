import { Grid, Paper } from "@mui/material"
import { useState } from "react"
import { adminSignUp } from "../../Service/auth.service"
import { AuthForm } from "../../GlobalComponents/Form/authForm"

export const AdminSignUp = () => {
	const [errorMsg, setErrorMsg] = useState("")

	const handleSignUp = async event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const username = data.get("username")
		const password = data.get("password")
		setErrorMsg("")

		try {
			await adminSignUp({ username, password })
		} catch (error) {
			setErrorMsg(error.message)
		}
	}

	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<AuthForm
				handleSubmit={handleSignUp}
				errorMsg={errorMsg}
				headerText='Create Admin'
				buttonText='CREATE'
			/>
		</Grid>
	)
}
