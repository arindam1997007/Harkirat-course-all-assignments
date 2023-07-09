import {
	Grid,
	Avatar,
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Paper,
	Box,
	Typography,
} from "@mui/material"
import PropTypes from "prop-types"

export const SignIn = ({ handleSubmit, toggleSignUp }) => {
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
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
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
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
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
	handleSubmit: PropTypes.func.isRequired,
	toggleSignUp: PropTypes.func.isRequired,
}
