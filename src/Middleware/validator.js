import { check, body } from "express-validator";

let validateCourseInputData = () => {
  return [check("name", "Length must > 6").isLength({ min: 6 })];
};

let validateRegisterInputData = () => {
  return [body("username", "Length must > 6").isLength({ min: 6 }), body("password", "Length must > 6").isLength({ min: 6 })];
};

let validate = {
  validateCourseInputData,
  validateRegisterInputData,
};

export default validate;
