/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("Promise Resolved")
		}, n)
	})
}

const time = 2000

const pr = wait(time)

setTimeout(() => {
	console.log("1500: ", pr)
}, time - 500)

setTimeout(() => {
	console.log("2500: ", pr)
}, time + 500)
