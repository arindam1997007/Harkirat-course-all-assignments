import mongoose from "mongoose"
let alreadyConnected = false

export async function ensureDBConnected() {
	if (alreadyConnected) return

	await mongoose.connect("mongodb://127.0.0.1/first_db")
	return
}
