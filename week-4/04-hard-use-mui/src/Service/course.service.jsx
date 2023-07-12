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
