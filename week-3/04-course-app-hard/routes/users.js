require("dotenv").config()
const express = require("express")
const router = express.Router()
const User = require("../models/usersModel")
const Course = require("../models/coursesModel")
const jwt = require("jsonwebtoken")

const isUserUsernameExist = async ({ username }) => {
	try {
		const query = User.where({ username })
		const user = await query.findOne()
		return user
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

const isUserExist = async ({ username, password }) => {
	try {
		const query = User.where({ username, password })
		const user = await query.findOne()
		return user
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

// User routes
router.post("/signup", async (req, res) => {
	// logic to sign up user
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({ message: "Missing username or password" })
	}

	try {
		const findUser = await isUserUsernameExist({ username })
		if (!!findUser)
			return res.status(400).json({ message: "Username already in use" })

		const user = new User({ username, password })
		const saveUser = await user.save()
		res.status(200).json({ user: saveUser.username })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.post("/login", async (req, res) => {
	// logic to log in user
	const { username, password } = req.headers
	const findUser = await isUserExist({ username, password })

	if (!findUser)
		return res.status(401).json({ message: "Username/Password incorrect" })

	const user = { username }
	const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY)
	res.status(200).json({ accessToken })
})

router.get("/courses", async (req, res) => {
	// logic to list all courses
	const course = await Course.find()
	res.status(200).json(course)
})

router.post("/courses/:courseId", async (req, res) => {
	// logic to purchase a course
	const courseId = req.params.courseId
	const username = req.user.username

	try {
		const course = await Course.findOne({ _id: courseId })

		if (!course) return res.status(400).json({ message: "Course not found" })

		await User.findOneAndUpdate(
			{ username },
			{
				$push: { purchasedCourses: course },
			},
			{ returnDocument: "after" }
		)

		res
			.status(200)
			.json({ message: `Course ${courseId} purchased successfully` })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.get("/purchasedCourses", async (req, res) => {
	// logic to view purchased courses
	const username = req.user.username

	try {
		const user = await User.findOne({ username })
		return res.status(200).json({ purchasedCourses: user.purchasedCourses })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
