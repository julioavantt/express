const mongoose = require("mongoose")

const { model, Schema } = mongoose

//! Creamos la estructura de un tipo de documento (users)
const userSchema = new Schema({
	id: String,
	name: String,
	lastName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
		//unique: true,
	},
	password: {
		type: String,
		required: true,
	},
})

//! Como primer parametro, va el nombre de la coleccion
module.exports = model("Users", userSchema)
