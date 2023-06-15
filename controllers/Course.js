const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const CourseModel = require("../models/Course")
const UserModel = require("../models/User")

async function readCourses(_, res) {
	try {
		await CourseModel.find().then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function createCourse(req, res) {
	jwt.verify(req.token, "rfrgrrrrrggg", async error => {
		if (error) {
			res.sendStatus(403)
		} else {
			const {
				title,
				img,
				detail,
				mentor,
				img_mentor,
				creator_id,
			} = req.body

			try {
				UserModel.findOne({ id: creator_id }).then(response => {
					if (response?.role === "admin") {
						const data = new CourseModel({
							id: uuid.v4(),
							title,
							img,
							detail,
							mentor,
							img_mentor,
						})

						data.save()
						res.status(201).json({
							success: true,
							data: req.body,
						})
					} else {
						res.sendStatus(403)
					}
				})
			} catch (error) {
				res.status(400).json({ message: error.message })
			}
		}
	})
}

async function deleteCourse(req, res) {
	jwt.verify(req.token, "rfrgrrrrrggg", async error => {
		if (error) {
			res.sendStatus(403)
		} else {
			const { id: course_id, user_id } = req.params

			try {
				UserModel.findOne({ id: user_id }).then(response => {
					if (response?.role === "admin") {
						CourseModel.deleteOne({ id: course_id }).then(
							response => {
								if (response.deletedCount) {
									res.status(200).json({
										message: `El curso con ${course_id} fue borrado exitosamente.`,
									})
								} else {
									res.status(200).json({
										message: `No se ha encontrado el curso: ${course_id}`,
									})
								}
							}
						)
					} else {
						res.sendStatus(403)
					}
				})
			} catch (error) {
				res.status(400).json({ message: error.message })
			}
		}
	})
}

async function updateCourse(req, res) {
	jwt.verify(req.token, "rfrgrrrrrggg", async error => {
		if (error) {
			res.sendStatus(403)
		} else {
			const { id: course_id, id_user, title } = req.body

			try {
				UserModel.findOne({ id: id_user }).then(response => {
					if (response?.role === "admin") {
						CourseModel.findOneAndUpdate(
							{ id: course_id },
							{ title }
						).then(response => {
							if (response.id) {
								res.status(200).json({
									message: `El curso con id ${response.id} fue editado exitosamente.`,
									data: res.body,
								})
							} else {
								res.status(200).json({
									message: `No se ha encontrado el curso.`,
								})
							}
						})
					} else {
						res.sendStatus(403)
					}
				})
			} catch (error) {
				res.status(400).json({ message: error.message })
			}
		}
	})
}

module.exports = {
	createCourse,
	deleteCourse,
	readCourses,
	updateCourse,
}
