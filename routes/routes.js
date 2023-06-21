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
	deleteUser,
	readUser,
	readUsers,
	updateUser,
} = require("../controllers/User")

const { login, register } = require("../controllers/Auth")

const {
	readCourses,
	createCourse,
	deleteCourse,
	searchCourses,
	updateCourse,
} = require("../controllers/Course")

const { verifyToken } = require("../middlewares/verifyToken")
const { verifyIsAdmin } = require("../middlewares/verifyIsAdmin")

const router = express.Router()

router.post("/create-user", validateCreate, register)
router.delete("/delete-user/:id", validateDelete, deleteUser)
router.put("/update-user", updateUser)
router.get(
	"/read-users-paginated",
	validateGetWithQueryStrings,
	readUsers
)
router.get("/read-users", verifyToken, verifyIsAdmin, readUsers)
router.get("/read-user/:id", verifyToken, readUser)

router.post("/login", login)

router.get("/read-courses", readCourses)
router.post(
	"/create-course",
	validateCreateCourse,
	verifyToken,
	verifyIsAdmin,
	createCourse
)

router.get("/search-courses", searchCourses)

router.delete(
	"/delete-course/:id/:user_id",
	verifyToken,
	verifyIsAdmin,
	deleteCourse
)
router.put("/update-course", verifyToken, verifyIsAdmin, updateCourse)

module.exports = router
