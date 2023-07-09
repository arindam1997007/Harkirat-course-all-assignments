const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	price: { type: Number, required: true },
	imageLink: { type: String },
	published: { type: Boolean, default: false },
})

module.exports = mongoose.model("Course", courseSchema)
