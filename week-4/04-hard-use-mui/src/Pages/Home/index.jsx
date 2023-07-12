import { Grid, Typography, Box } from "@mui/material"
import { useState } from "react"
import { SignIn } from "../../Components/SignIn"
import { UserSignUp } from "../../Components/SignUp/userSignUp"
import BackgroundImage from "../../Assets/Images/home-page-background.jpg"

export const Home = () => {
	const [toggleSignIn, setToggleSignIn] = useState(true)

	const toggleSignUp = () => {
		setToggleSignIn(!toggleSignIn)
	}

	return (
		<Grid container component='main' sx={{ height: "100vh" }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/src/Assets/Images/home-page-background.jpg), url(${BackgroundImage})`,
					backgroundRepeat: "no-repeat",
					backgroundColor: t =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					minHeight='100vh'
				>
					<Typography component='h1' variant='h1' sx={{ fontWeight: 600 }}>
						Welcome To Course Academy
					</Typography>
				</Box>
			</Grid>
			{toggleSignIn ? (
				<SignIn toggleSignUp={toggleSignUp} />
			) : (
				<UserSignUp toggleSignUp={toggleSignUp} />
			)}
		</Grid>
	)
}
