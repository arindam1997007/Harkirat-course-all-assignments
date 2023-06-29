require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const cors = require("cors")

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader?.split(" ")?.[1]
	if (!token) return res.status(400).json({ message: "No Token" })

	jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
		if (err) return res.status(403).json({ message: "Unauthorized" })
		req.user = user
		next()
	})
}

const authenticateAdmin = (req, res, next) => {
	const findAdmin = ADMINS.findIndex(
		admin => admin.username === req.user.username
	)
	if (findAdmin === -1) return res.status(403).json({ message: "Not An Admin" })
	next()
}

const authenticateUser = (req, res, next) => {
	const findUser = USERS.findIndex(
		admin => admin.username === req.user.username
	)
	if (findUser === -1) return res.status(403).json({ message: "Not An User" })
	next()
}

const jwtMiddleware = (req, res, next) => {
	const protectedRoutes = ["/admin/courses"]
	if (protectedRoutes.some(route => req.url.startsWith(route))) {
		authenticateToken(req, res, next)
	} else {
		next()
	}
}

app.use([express.json(), cors(), jwtMiddleware])

let ADMINS = []
let USERS = []
let COURSES = []

// Admin routes
app.post("/admin/signup", (req, res) => {
	// logic to sign up admin
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({ message: "Missing username or password" })
	}

	const index = ADMINS.findIndex(user => user.username === username)

	if (index !== -1)
		return res.status(400).json({ message: "Username already in use" })

	ADMINS.push({ username, password })
	res.status(200).json({ message: "Admin successfully signed up" })
})

app.post("/admin/login", (req, res) => {
	// logic to log in admin
	const { username, password } = req.headers

	const index = ADMINS.findIndex(
		user => user.username === username && user.password === password
	)
	if (index === -1)
		return res.status(401).json({ message: "Username/Password incorrect" })

	const user = { username }
	const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY)
	res.status(200).json({ accessToken })
})

app.post("/admin/courses", authenticateAdmin, (req, res) => {
	// logic to create a course
	const user = req.user

	const { title, description, price, imageLink, published } = req.body

	if (!title || !price)
		return res.status(400).json({ message: "Title and Price is required" })

	const index = COURSES.findIndex(course => course.title === title)
	if (index !== -1)
		return res.status(400).json({ message: "Duplicate Course Title" })

	const id = COURSES.length > 0 ? COURSES.at(-1).id + 1 : 1
	COURSES.push({ id, title, description, price, imageLink, published })
	res.status(201).json({ message: "Success", id })
})

app.put("/admin/courses/:courseId", authenticateAdmin, (req, res) => {
	// logic to edit a course
	const { title, description, price, imageLink, published } = req.body
	const courseId = parseInt(req.params.courseId)

	const index = COURSES.findIndex(course => course.id === courseId)
	if (index === -1)
		return res.status(400).json({ message: "Invalid Course ID" })

	const originalCourse = COURSES[index]

	COURSES[index] = {
		id: originalCourse.id,
		title: title || originalCourse.title,
		description: description || originalCourse.description,
		price: price || originalCourse.price,
		imageLink: imageLink || originalCourse.imageLink,
		published: published || originalCourse.published,
	}
	res.status(201).json({ message: "Course Edited" })
})

app.get("/admin/courses", authenticateAdmin, (req, res) => {
	// logic to get all courses
	res.status(200).json({ Courses: COURSES })
})

// User routes
app.post("/users/signup", (req, res) => {
	// logic to sign up user
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({ message: "Missing username or password" })
	}

	const index = USERS.findIndex(user => user.username === username)

	if (index !== -1)
		return res.status(400).json({ message: "Username already in use" })

	USERS.push({ username, password })
	res.status(200).json({ message: "Admin successfully signed up" })
})

app.post("/users/login", (req, res) => {
	// logic to log in user
	const { username, password } = req.headers

	const index = USERS.findIndex(
		user => user.username === username && user.password === password
	)
	if (index === -1)
		return res.status(401).json({ message: "Username/Password incorrect" })

	const user = { username }
	const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY)
	res.status(200).json({ accessToken })
})

app.get("/users/courses", authenticateUser, (req, res) => {
	// logic to list all courses
	res.status(200).json({ Courses: COURSES })
})

app.post("/users/courses/:courseId", authenticateUser, (req, res) => {
	// logic to purchase a course
	const courseId = parseInt(req.params.courseId)

	const course = COURSES.find(course => course.id === courseId)
	if (!course) return res.status(400).json({ message: "Course not found" })

	const user = USERS.find(user => user.username === req.user.username)
	if (!!user) {
		user["purchasedCourses"] = [...user.purchasedCourses, course]
		return res.status(201).json({ message: "Course purchased successfully" })
	}
})

app.get("/users/purchasedCourses", authenticateUser, (req, res) => {
	// logic to view purchased courses
	const user = USERS.find(user => user.username === req.user.username)
	if (!!user) {
		return res.status(200).json({ purchasedCourses: user.purchasedCourses })
	}
})

app.listen(3000, () => {
	console.log("Server is listening on port 3000")
})
