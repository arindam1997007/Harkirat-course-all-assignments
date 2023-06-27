/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */

function waitOneSecond() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("Wait One Second completed")
		}, 1000)
	})
}

function waitTwoSecond() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("Wait Two Second completed")
		}, 2000)
	})
}

function waitThreeSecond() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("Wait Three Second completed")
		}, 3000)
	})
}

async function calculateTime() {
	const startTime = new Date().getTime()
	Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()]).then(
		values => {
			console.log(values)
			const endTime = new Date().getTime()
			console.log(
				"Total time taken: ",
				(endTime - startTime) / 1000,
				" seconds"
			)
		}
	)
}

calculateTime()
