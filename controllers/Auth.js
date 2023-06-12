const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const UserModel = require("../models/User")

async function login(req, res) {
	const { email, password } = req.body

	await UserModel.findOne({ email }).then(async response => {
		if (response?.id) {
			const isMatch = await bcrypt.compare(
				password,
				response.password
			)

			if (isMatch) {
				jwt.sign(
					{ user: response },
					"rfrgrrrrrggg",
					(err, token) => {
						res.status(200).json({
							token: token,
							user: response,
						})
					}
				)
			} else {
				res.status(401).json({
					message: "Invalid credentials",
				})
			}
		} else {
			res.status(200).json({
				message: `Document not found.`,
			})
		}
	})
}

module.exports = {
	login,
}
