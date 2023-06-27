const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "./3-read-from-file.md")

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	console.log(data)
})

// Expensive operation

for (let i = 0; i < 10000000000; i++) {}
