/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
*/

function calculateTime(n) {
	let sum = 0
	const t0 = performance.now()

	for (let i = 1; i < n; i++) {
		sum = sum + i
	}
	const t1 = performance.now()
	const timeDiff = t1 - t0

	console.log(`Sum to do 1-${n} took ${timeDiff} milliseconds.`)
	return timeDiff
}

calculateTime(100)
calculateTime(100000)
calculateTime(1000000000)
