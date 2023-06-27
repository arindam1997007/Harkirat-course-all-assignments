setInterval(() => {
	const time = new Date().toLocaleString().split(", ")[1]
	const timeArr = time.split(" ")
	if (timeArr[1] === "pm") {
		let [hour, minute, second] = timeArr[0].split(":")
		hour = parseInt(hour, 10) + 12
		console.log(`${hour}:${minute}:${second}`)
	} else {
		console.log(timeArr[0])
	}
	console.log(time, "\n")
}, 1000)
