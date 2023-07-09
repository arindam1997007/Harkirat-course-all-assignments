import { Grid } from "@mui/material"
import { useState } from "react"
import { SignIn } from "../../Components/SignIn"
import { SignUp } from "../../Components/SignUp"
import BackgroundImage from "../../Assets/Images/home-page-background.jpg"

export const Home = () => {
	const [toggleSignIn, setToggleSignIn] = useState(true)

	const handleSubmit = event => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		})
	}

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
					backgroundImage: `url(${BackgroundImage})`,
					backgroundRepeat: "no-repeat",
					backgroundColor: t =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			{toggleSignIn ? (
				<SignIn handleSubmit={handleSubmit} toggleSignUp={toggleSignUp} />
			) : (
				<SignUp toggleSignUp={toggleSignUp} />
			)}
		</Grid>
	)
}
