const mongoose = require("mongoose")

const { model, Schema } = mongoose

//! Creamos la estructura de un tipo de documento (users)
const userSchema = new Schema({
	id: String,
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "client"],
		required: true,
	},
})

//! Como primer parametro, va el nombre de la coleccion
module.exports = model("Users", userSchema)
