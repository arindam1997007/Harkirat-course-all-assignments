/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
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
	console.log(await waitOneSecond())
	console.log(await waitTwoSecond())
	console.log(await waitThreeSecond())
	const endTime = new Date().getTime()
	console.log("Total time taken: ", (endTime - startTime) / 1000, " seconds")
}

calculateTime()
