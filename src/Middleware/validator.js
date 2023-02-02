import { check } from "express-validator";

let validateInputData = () => {
  return [check("name", "Length must > 6").isLength({ min: 6 })];
};

let validate = {
  validateInputData: validateInputData,
};

export default validate;
