import { Grid, Paper, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useState } from "react"
import { userSignUp } from "../../Service/auth.service"
import { AuthForm } from "../../GlobalComponents/Form/authForm"

export const UserSignUp = ({ toggleSignUp }) => {
	const [errorMsg, setErrorMsg] = useState("")

	const handleSignUp = async event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const username = data.get("username")
		const password = data.get("password")
		setErrorMsg("")

		try {
			const res = await userSignUp({ username, password })
			console.log({ res })
		} catch (error) {
			setErrorMsg(error.message)
		}
	}

	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<AuthForm
				handleSubmit={handleSignUp}
				errorMsg={errorMsg}
				headerText='Sign Up'
			/>
			<Grid container justifyContent='flex-end'>
				<Grid item>
					<Typography
						sx={{
							textDecoration: "underline",
							marginLeft: "6px",
							cursor: "pointer",
						}}
						onClick={toggleSignUp}
					>{`Sign In`}</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}

UserSignUp.propTypes = {
	toggleSignUp: PropTypes.func.isRequired,
}
