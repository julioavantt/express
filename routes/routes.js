const express = require("express")

const {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
} = require("../middlewares/validators/user")

const {
	validateCreateCourse,
} = require("../middlewares/validators/course")

const {
	createUser,
	deleteUser,
	readUser,
	readUsers,
	updateUser,
} = require("../controllers/User")

const { login } = require("../controllers/Auth")

const {
	readCourses,
	createCourse,
	deleteCourse,
	updateCourse,
} = require("../controllers/Course")

const { verifyToken } = require("../middlewares/verifyToken")
const { verifyIsAdmin } = require("../middlewares/verifyIsAdmin")

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

router.get("/read-courses", readCourses)
router.post(
	"/create-course",
	validateCreateCourse,
	verifyIsAdmin,
	verifyToken,
	createCourse
)
router.delete(
	"/delete-course/:id/:user_id",
	verifyToken,
	deleteCourse
)
router.put("/update-course", verifyToken, updateCourse)

module.exports = router
