const {
	param,
	check,
	query,
	validationResult,
} = require("express-validator")

const validateCreateCourse = [
	check("title")
		.exists()
		.notEmpty()
		.withMessage("El campo title es obligatorio"),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403)
			res.send({ errors: err.array() })
		}
	},
]

/* const validateDelete = [
	param("id").exists().isString(),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403)
			res.send({ errors: err.array() })
		}
	},
]

const validateGetWithQueryStrings = [
	query("size").exists().isString(),
	query("page").exists().isString(),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403)
			res.send({ errors: err.array() })
		}
	},
] */

module.exports = {
	validateCreateCourse,
	/* 	validateDelete,
	validateGetWithQueryStrings, */
}
