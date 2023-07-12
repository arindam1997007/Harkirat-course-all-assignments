import axios from "axios"

export const axiosService = axios.create({
	baseURL: "http://localhost:3000/",
})

axiosService.interceptors.request.use(
	function (config) {
		if (localStorage.getItem("authToken")) {
			config.headers.Authorization = localStorage.getItem("authToken")
		}

		return config
	},
	function (error) {
		return Promise.reject(error)
	}
)
