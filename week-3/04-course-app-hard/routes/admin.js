require("dotenv").config()
const express = require("express")
const router = express.Router()
const Admin = require("../models/adminModel")
const Course = require("../models/coursesModel")
const jwt = require("jsonwebtoken")

const isAdminUsernameExist = async ({ username }) => {
	try {
		const query = Admin.where({ username })
		const admin = await query.findOne()
		return admin
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const isAdminExist = async ({ username, password }) => {
	try {
		const query = Admin.where({ username, password })
		const admin = await query.findOne()
		return admin
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

router.get("/allAdmin", async (req, res) => {
	const admin = await Admin.find()
	res.json(admin)
})

// Admin routes
router.post("/signup", async (req, res) => {
	// logic to sign up admin
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({ message: "Missing username or password" })
	}

	try {
		const findAdmin = await isAdminUsernameExist({ username })
		if (!!findAdmin)
			return res.status(400).json({ message: "Username already in use" })

		const admin = new Admin({ username, password })
		const saveAdmin = await admin.save()
		res.status(200).json(saveAdmin)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.post("/login", async (req, res) => {
	// logic to log in admin
	const { username, password } = req.headers
	const findAdmin = await isAdminExist({ username, password })

	if (!findAdmin)
		return res.status(401).json({ message: "Username/Password incorrect" })

	const user = { username }
	const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY)
	res.status(200).json({ accessToken })
})

router.post("/courses", async (req, res) => {
	// logic to create a course

	const { title, description, price, imageLink, published } = req.body

	if (!title || !price)
		return res.status(400).json({ message: "Title and Price is required" })

	try {
		const query = Course.where({ title })
		const findCourse = await query.findOne()
		if (!!findCourse)
			return res.status(400).json({ message: "Duplicate Course Title" })

		const course = new Course({
			title,
			description,
			price,
			imageLink,
			published,
		})
		const saveCourse = await course.save()
		res.status(201).json(saveCourse)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

router.put("/courses/:courseId", async (req, res) => {
	// logic to edit a course
	const { title, description, price, imageLink, published } = req.body
	const courseId = req.params.courseId

	try {
		const course = await Course.findOneAndReplace(
			{ _id: courseId },
			{
				title,
				description,
				price,
				imageLink,
				published,
			},
			{ returnDocument: "after" }
		)

		if (!course) return res.status(400).json({ message: "Invalid Course ID" })

		res.status(201).json(course)
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
})

router.get("/courses", async (req, res) => {
	// logic to get all courses
	const course = await Course.find()
	res.status(200).json(course)
})

module.exports = router
