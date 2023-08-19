import { FormEvent, useState } from "react"
import { Avatar, Button, TextField, Box, Typography } from "@mui/material"

type SignUpProps = {
	errorMsg: string
	setErrorMsg: (error: string) => void
	handleSignup: (e: FormEvent<HTMLFormElement>) => void
}

export const SignUp = ({
	errorMsg,
	setErrorMsg,
	handleSignup,
}: SignUpProps) => {
	return (
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
			<Typography component='h2' variant='h5' sx={{ letterSpacing: "0.05em" }}>
				Sign Up
			</Typography>
			<Box component='form' noValidate onSubmit={handleSignup} sx={{ mt: 1 }}>
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
					sx={{ mt: 3, mb: 2, textTransform: "uppercase" }}
				>
					Sign Up
				</Button>
			</Box>
		</Box>
	)
}
