/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
	const categoryMap = new Map()
	const arr = []
	transactions.forEach(trans => {
		categoryMap.set(
			trans.category,
			(categoryMap.get(trans.category) || 0) + trans.price
		)
	})
	categoryMap.forEach((value, key) => {
		arr.push({ category: key, totalSpent: value })
	})
	return arr
}

module.exports = calculateTotalSpentByCategory
