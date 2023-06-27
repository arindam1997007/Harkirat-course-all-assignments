const todoForm = document.getElementById("todo-form")
todoForm.addEventListener("submit", handleSubmit)

function handleSubmit(event) {
	console.log({ event })
	event.preventDefault() // Prevent the form from submitting
	event.stopPropagation()

	// // Retrieve the values from the form
	const item = document.getElementById("item").value
	const description = document.getElementById("description").value

	// // Do something with the values (e.g., display them in the console)
	// console.log("item: " + item)
	// console.log("description: " + description)

	// // You can also perform further validation or processing here

	// // Reset the form

	fetch("http://localhost:3000/todos", {
		method: "POST",
		body: JSON.stringify({
			title: item,
			completed: false,
			description: description,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => {
		res.json().then(data => {})
		event.target.reset()
	})
}

function getData() {
	return fetch("http://localhost:3000/todos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => {
		return res
			.json()
			.then(data => {
				return data
			})
			.catch(err => {
				return undefined
			})
	})
}

function deleteTodo(id) {
	fetch(`http://localhost:3000/todos/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => {
		res.json().then(data => {
			console.log("Deleted", data)
		})
	})
}

function updateTodo(item) {
	fetch(`http://localhost:3000/todos/${item.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: item.title,
			completed: !item.completed,
			description: item.description,
		}),
	}).then(res => {
		res.json().then(data => {
			console.log("Updated", data)
		})
	})
}

function showAllTodos(data) {
	const todoList = document.getElementById("todo-list")

	// Assuming you have the data stored in a variable called "data"
	data?.forEach(item => {
		// Create a div element
		const div = document.createElement("div")
		div.className = "item"

		// Create a checkbox for the completed status
		const checkbox = document.createElement("input")
		checkbox.type = "checkbox"
		checkbox.checked = item.completed
		checkbox.onclick = function () {
			updateTodo(item)
		}

		// Create a label for the title and description
		const label = document.createElement("label")
		label.innerText = `${item.title}: ${item.description}`

		const deleteButton = document.createElement("button")
		deleteButton.textContent = "Delete"
		deleteButton.onclick = function (event) {
			event.stopPropagation()
			deleteTodo(item.id)
		}

		// Append the checkbox and label to the div
		div.appendChild(checkbox)
		div.appendChild(label)
		div.appendChild(deleteButton)

		// Append the div to the container
		todoList.appendChild(div)
	})
}

async function initialize() {
	const data = await getData()
	showAllTodos(data)
}

initialize()
