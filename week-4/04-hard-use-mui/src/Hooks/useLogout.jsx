import { useNavigate } from "react-router-dom"

export const useLogout = () => {
	const navigate = useNavigate()

	const logout = () => {
		navigate("/")
		localStorage.clear()
	}

	return { logout }
}
