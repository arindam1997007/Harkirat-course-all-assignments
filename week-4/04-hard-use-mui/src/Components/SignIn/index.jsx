import {
	Grid,
	Avatar,
	Button,
	TextField,
	Paper,
	Box,
	Typography,
	Checkbox,
	FormControlLabel,
} from "@mui/material"
import PropTypes from "prop-types"
import { useState } from "react"
import { adminSignIn, userSignIn } from "../../Service/auth.service"
import { useNavigate } from "react-router-dom"

export const SignIn = ({ toggleSignUp }) => {
	const navigate = useNavigate()
	const [errorMsg, setErrorMsg] = useState("")

	const handleSignIn = async event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const username = data.get("username")
		const password = data.get("password")
		const isAdmin = data.get("isAdmin")
		setErrorMsg("")

		if (isAdmin === "on") {
			try {
				const res = await adminSignIn({ username, password })
				console.log({ res })
				navigate("/admin")
			} catch (error) {
				setErrorMsg(error.message)
			}
		} else {
			userSignIn
			try {
				const res = await userSignIn({ username, password })
				console.log({ res })
			} catch (error) {
				setErrorMsg(error.message)
			}
		}
	}

	return (
		<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
			<Box
				sx={{
					my: 8,
					mx: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
				<Typography
					component='h2'
					variant='h5'
					sx={{ letterSpacing: "0.05em" }}
				>
					Sign in
				</Typography>
				<Box component='form' noValidate onSubmit={handleSignIn} sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='username'
						label='Username'
						name='username'
						autoComplete='username'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel
						control={<Checkbox name='isAdmin' />}
						label='Is Admin'
					/>
					{errorMsg.length > 0 && (
						<Typography
							paragraph={true}
							align='center'
							sx={{ fontSize: "0.8em", color: "#c93e3e", margin: 0 }}
							gutterBottom={false}
						>
							{errorMsg}
						</Typography>
					)}
					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Typography display='inline'>{`Don't have an account`}</Typography>
							<Typography
								display='inline'
								sx={{
									textDecoration: "underline",
									marginLeft: "6px",
									cursor: "pointer",
								}}
								onClick={toggleSignUp}
							>{`Sign Up`}</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Grid>
	)
}

SignIn.propTypes = {
	toggleSignUp: PropTypes.func.isRequired,
}
