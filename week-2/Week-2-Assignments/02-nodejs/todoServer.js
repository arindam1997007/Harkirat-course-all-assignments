/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

/* README

	Using a text file to store the information, so as to implement persistence.
	To pass the tests, please clear the database.txt file before running .
	Comment out app.listen() while running tests

  */
const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")

const path = require("path")

const filePath = path.join(__dirname, "./database.txt")

const app = express()

app.use(bodyParser.json())

const getTodoList = async () => {
	let todoList = new Map()
	try {
		const data = await fs.promises.readFile(filePath, "utf8")
		const db = JSON.parse(data)
		todoList = new Map(db)
	} catch (error) {
		console.error("Error reading file:", error)
	} finally {
		return todoList
	}
}

const writeData = async todoList => {
	const data = JSON.stringify([...todoList])
	try {
		await fs.promises.writeFile(filePath, data, "utf8")
	} catch (error) {
		console.error("Error writing file:", error)
	}
	return
}

const getLatestTodoItem = todoList => {
	return Array.from(todoList).at(-1)
}

const newID = todoList => {
	const lastItem = getLatestTodoItem(todoList)
	if (!lastItem) return 1
	return lastItem[0] + 1
}

const getTodoArray = todoList => {
	const todoArray = []
	todoList.forEach((value, key) => {
		todoArray.push({ id: key, ...value })
	})
	return todoArray
}

app.get("/todos", async (req, res) => {
	const todoList = await getTodoList()
	if (todoList.size) {
		res.status(200).send(getTodoArray(todoList))
		return
	}
	res.status(404).send("Not Found")
})

app.get("/todos/:id", async (req, res) => {
	const todoList = await getTodoList()
	const id = parseInt(req.params.id)
	if (todoList.has(id)) {
		res.status(200).send({ id, ...todoList.get(id) })
		return
	}
	res.status(404).send("Not Found")
})

app.post("/todos", async (req, res) => {
	const todoList = await getTodoList()
	const id = newID(todoList)
	todoList.set(id, req.body)
	await writeData(todoList)
	res.status(201).send({ id })
})

app.put("/todos/:id", async (req, res) => {
	const todoList = await getTodoList()
	const id = parseInt(req.params.id)
	if (!todoList.has(id)) {
		res.status(404).send("Not Found")
		return
	}
	todoList.set(id, req.body)
	await writeData(todoList)
	res.status(200).send({ id })
})

app.delete("/todos/:id", async (req, res) => {
	const todoList = await getTodoList()

	const id = parseInt(req.params.id)
	if (!todoList.has(id)) {
		res.status(404).send("Not Found")
		return
	}
	todoList.delete(id, req.body)
	await writeData(todoList)
	res.status(200).send({ id })
})

app.listen(3000)

module.exports = app
