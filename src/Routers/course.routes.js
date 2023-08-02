import express from "express";
import CourseController from "../Controllers/CourseController.js";
import validator from "../Middleware/validator.js";
import authMiddleware from "../Middleware/authentication.js";
import checkValidation from "../Middleware/checkValidation.js";

const router = express.Router();

router.get("/", CourseController.getAllCourse);
router.get("/ids", CourseController.getCourse);
router.get("/:id", CourseController.findOne);
router.post("/", validator.validateCourseInputData(), checkValidation.checkValidation, CourseController.create);
router.put("/", CourseController.update);
router.delete("/:_id", CourseController.delete);

router.put("/addCourse", authMiddleware.authentication, CourseController.addCourseToUser);
router.put("/removeCourse", authMiddleware.authentication, CourseController.removeCourseFromUser);

export default router;
