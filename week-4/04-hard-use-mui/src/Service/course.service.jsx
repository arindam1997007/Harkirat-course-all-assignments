import { axiosService } from "./axiosService"

export const getAllCourses = async () => {
	return axiosService({
		method: "get",
		url: "admin/courses",
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err.response.data)
		})
}

export const createCourse = async ({
	title,
	description,
	price,
	imageLink,
	published,
}) => {
	return axiosService({
		method: "post",
		url: "admin/courses",
		data: {
			title,
			description,
			price,
			imageLink,
			published,
		},
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return Promise.reject(err.response.data)
		})
}
