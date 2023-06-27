let firstTime = new Date().getTime()
let time = 0
while (true) {
	let secondTime = new Date().getTime()
	if ((secondTime - firstTime) / 1000 === time) {
		time += 1
		console.log(`Time: ${time}s`)
	}
}
