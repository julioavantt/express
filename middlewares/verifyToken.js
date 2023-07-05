const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
	const bearerHeader = req.headers["authorization"]

	if (typeof bearerHeader !== "undefined") {
		let bearerToken = bearerHeader.split(" ")[1]

		console.log(bearerToken, process.env.SECRET)

		jwt.verify(
			bearerToken,
			process.env.SECRET,
			async (error, payload) => {
				if (error) {
					console.log(error)
					res.status(403).json({ message: "Bad token1" })
				} else {
					req.role = payload.user.role
					req.id = payload.user.id
					next()
				}
			}
		)
	} else {
		res.status(403).json({ message: "Bad token" })
	}
}

module.exports = { verifyToken }
