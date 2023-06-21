const verifyIsAdmin = (req, res, next) =>
	req.role === "admin"
		? next()
		: res.status(403).json({ message: "Invalid credentials" })

module.exports = { verifyIsAdmin }
