fetch("http://localhost:3000/headers", {
	method: "POST",
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
	},
	body: JSON.stringify({ name: "glowy-effect" }),
}).then(res => {
	res.json().then(data => {
		console.log(data)
	})
})
