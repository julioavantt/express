const express = require("express")

const {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
} = require("../validators/user")

const {
	createUser,
	deleteUser,
	readUser,
	readUsers,
	updateUser,
} = require("../controllers/User")

const { login } = require("../controllers/Auth")

const { verifyToken } = require("../middlewares/verifyToken")

const router = express.Router()

router.post("/create-user", validateCreate, createUser)
router.delete("/delete-user/:id", validateDelete, deleteUser)
router.put("/update-user", updateUser)
router.get(
	"/read-users-paginated",
	validateGetWithQueryStrings,
	readUsers
)
router.get("/read-users", verifyToken, readUsers)
router.get("/read-user/:id", readUser)

router.post("/login", login)

module.exports = router
