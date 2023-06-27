const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

const middleware = (req, res, next) => {
	next()
}
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)
app.use(bodyParser.json())

// app.get("/", (req, res) => {
// 	res.send(`<head><title>Testing</title></head><body><em>Yayyy</em></body>`)
// })

app.get("/handlesum", (req, res) => {
	const value = calculateSum(req.query.counter)
	const result = `The sum of ${req.query.counter} is ${value}`
	res.send(result)
})

app.post("/headers", (req, res) => {
	const value = req.headers
	console.log(req.body)
	const result = `Value is ${req.body?.name}`
	console.log(req.body)
	res.status(200).send({ result: req.body.name })
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

const calculateSum = n => {
	let sum = 0
	for (let i = 0; i <= n; i++) sum += i
	return sum
}

console.log(calculateSum(100))
