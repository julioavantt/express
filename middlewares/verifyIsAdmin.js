function verifyIsAdmin(req, res, next) {
	const role = req.body.role

	if (role === "admin") {
		next()
	} else {
		res.sendStatus(403)
	}
}

module.exports = { verifyIsAdmin }
