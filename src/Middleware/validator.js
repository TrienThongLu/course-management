import { check, body } from "express-validator";

let validateCourseData = () => {
  return [check("name").isLength({ min: 6 }).withMessage("Length must > 6")];
};

let validateRegisterData = () => {
  return [
    body("username").isLength({ min: 6 }).withMessage("Length must > 6"),
    body("password").isLength({ min: 6 }).withMessage("Length must > 6"),
  ];
};

let validateLoginData = () => {
  return [
    body("username")
      .isLength({ min: 6 })
      .withMessage("Length must > 6")
      .isString()
      .withMessage("Must be a string"),
    body("password").isLength({ min: 6 }).withMessage("Length must > 6"),
  ];
};

let validate = {
  validateCourseData,
  validateRegisterData,
  validateLoginData,
};

export default validate;
