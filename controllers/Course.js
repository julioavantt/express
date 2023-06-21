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
	const { title, img, detail, mentor, img_mentor, creator_id } =
		req.body

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

async function deleteCourse(req, res) {
	const { id } = req.params

	try {
		CourseModel.deleteOne({ id }).then(response => {
			if (response.deletedCount) {
				res.status(200).json({
					message: `El curso con ${id} fue borrado exitosamente.`,
				})
			} else {
				res.status(200).json({
					message: `No se ha encontrado el curso: ${id}`,
				})
			}
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function updateCourse(req, res) {
	const { id_course, modify } = req.body

	try {
		CourseModel.findOneAndUpdate({ id: id_course }, modify).then(
			response => {
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
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function searchCourses(req, res) {
	const { q } = req.query

	try {
		await CourseModel.find(
			{
				$text: { $search: q },
			},
			{ score: { $meta: "textScore" } }
		)
			.sort({
				score: { $meta: "textScore" },
			})
			.then(response => {
				res.status(200).json({ data: response })
			})
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: error.message })
	}
}

module.exports = {
	createCourse,
	deleteCourse,
	readCourses,
	searchCourses,
	updateCourse,
}
