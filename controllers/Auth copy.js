const jwt = require("jsonwebtoken")

const UserModel = require("../models/User")

async function getUsers(req, res) {
	jwt.verify(req.token, "secretkey", async error => {
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

