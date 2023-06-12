const bcrypt = require("bcrypt")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const UserModel = require("../models/User")

async function getUsers(req, res) {
	jwt.verify(req.token, "rfrgrrrrrggg", async error => {
		if (error) {
			res.sendStatus(403)
		} else {
			try {
				await UserModel.find().then(response => {
					const excludePassword = response.map(user => {
						const { id, name, lastName, userName } = user
						return { id, name, lastName, userName }
					})
					res.status(200).json(excludePassword)
				})
			} catch (error) {
				res.status(400).json({ message: error.message })
			}
		}
	})
}

async function getUsersPaginated(req, res) {
	const { size, page } = req.query

	const skip = size * page - size

	try {
		const data = await UserModel.find()
			.limit(size)
			.skip(skip)
			.then(response => {
				const excludePassword = response.map(user => {
					const { id, name, lastName, userName } = user
					return { id, name, lastName, userName }
				})
				return excludePassword
			})
		const count = await UserModel.countDocuments()
		res.status(200).json({
			data,
			total: count,
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function createUser(req, res) {
	try {
		const { name, userName, lastName, password, email } = req.body

		const salt = bcrypt.genSaltSync(10)
		const hash = await bcrypt.hash(password, salt)

		const data = new UserModel({
			name,
			id: uuid.v4(),
			userName,
			lastName,
			password: hash,
			email,
		})

		data.save()
		res.status(201)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function deleteUser(req, res) {
	try {
		const { id } = req.params

		UserModel.deleteOne({ id }).then(response => {
			if (response.deletedCount) {
				res.status(200).json({
					message: `El documento con ${id} fue borrado exitosamente.`,
				})
			} else {
				res.status(200).json({
					message: `No se ha encontrado el documento:  ${id}`,
				})
			}
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function updateUser(req, res) {
	try {
		const { id, name } = req.body

		await UserModel.findOneAndUpdate({ id }, { name }).then(
			response => {
				if (response.id) {
					res.status(200).json({
						message: `El documento con id ${response.id} fue editado exitosamente.`,
						data: res.body,
					})
				} else {
					res.status(200).json({
						message: `No se ha encontrado el documento.`,
					})
				}
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function readUser(req, res) {
	try {
		const { id } = req.params

		UserModel.findOne({ id }).then(response =>
			res.status(200).json(response)
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function readUsers(req, res) {
	if (Object.keys(req.query).length === 0) getUsers(req, res)
	else getUsersPaginated(req, res)
}

module.exports = {
	createUser,
	deleteUser,
	readUser,
	readUsers,
	updateUser,
}
