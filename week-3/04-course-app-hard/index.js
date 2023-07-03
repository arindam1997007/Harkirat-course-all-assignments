require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const cors = require("cors")
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on("error", err => console.error(err))
db.once("open", () => console.log("Database connected"))

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

const jwtMiddleware = (req, res, next) => {
	const protectedRoutes = [
		"/admin/courses",
		"/users/courses",
		"/users/purchasedCourses",
	]
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

const adminRouter = require("./routes/admin")
app.use("/admin", adminRouter)

const userRouter = require("./routes/users")
app.use("/users", userRouter)

app.listen(3000, () => {
	console.log("Server is listening on port 3000")
})
