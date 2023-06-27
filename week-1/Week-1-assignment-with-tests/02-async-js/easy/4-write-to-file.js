const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "./4-write-to-file.md")

const data = "\nExtra content appended using javascript code"

fs.appendFile(filePath, data, "utf8", err => {
	if (err) {
		console.error(err)
		return
	}
	console.log("File has been written successfully.")
})
