import { axiosService } from "./axiosService"

export const adminSignIn = async ({ username, password }) => {
	return axiosService({
		method: "post",
		url: "admin/login",
		headers: {
			username,
			password,
		},
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err.response.data)
		})
}

export const userSignIn = async ({ username, password }) => {
	return axiosService({
		method: "post",
		url: "users/login",
		headers: {
			username,
			password,
		},
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err.response.data)
		})
}

export const adminSignUp = async ({ username, password }) => {
	return axiosService({
		method: "post",
		url: "admin/signup",
		headers: {
			username,
			password,
		},
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err.response.data)
		})
}

export const userSignUp = async ({ username, password }) => {
	return axiosService({
		method: "post",
		url: "users/signup",
		headers: {
			username,
			password,
		},
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err.response.data)
		})
}
