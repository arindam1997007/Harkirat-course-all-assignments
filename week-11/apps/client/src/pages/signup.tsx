import { SignUp as SignUpComponent } from "ui/components/signup"
import { useState } from "react"
import { FormEvent } from "react"

export default function SignUp() {
	const [errorMsg, setErrorMsg] = useState("")

	const handleSignup = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const data = new FormData(e.currentTarget)
		const username = data.get("username")
		const password = data.get("password")
		setErrorMsg("")

		fetch("/api/signup", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				if (data.message) alert(data.message)
				else alert("Successfully signed up!!")
			})
	}
	return (
		<>
			<SignUpComponent
				errorMsg={errorMsg}
				setErrorMsg={setErrorMsg}
				handleSignup={handleSignup}
			/>
		</>
	)
}
