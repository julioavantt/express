const mongoose = require("mongoose")

const { model, Schema } = mongoose

//! Creamos la estructura de un tipo de documento (courses)
const courseSchema = new Schema({
	id: String,
	title: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	detail: {
		type: String,
		required: true,
	},
	mentor: {
		type: String,
		required: true,
	},
	img_mentor: {
		type: String,
		required: true,
	},
})

courseSchema.index({ title: "text", detail: "text", mentor: "text" })

//! Como primer parametro, va el nombre de la coleccion
module.exports = model("Courses", courseSchema)
