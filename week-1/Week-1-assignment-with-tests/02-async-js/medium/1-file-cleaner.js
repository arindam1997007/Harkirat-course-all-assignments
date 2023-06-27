const fs = require("fs")
const readline = require("readline")
const path = require("path")

const filePath = path.join(__dirname, "sample-file.md")

if (fs.existsSync(filePath)) {
	const readStream = fs.createReadStream(filePath)
	const rl = readline.createInterface({
		input: readStream,
		crlfDelay: Infinity,
	})
	let data = ""
	rl.on("line", line => {
		data = data + line?.replace(/\s+/g, " ").trim() + "\n"
	})

	rl.on("close", () => {
		console.log("Finished reading the file.")
		fs.writeFile(filePath, data, (err, data) => {
			console.log("File overwritten successfully")
		})
	})
} else {
	console.log("File doesn't exist ", filePath)
}
