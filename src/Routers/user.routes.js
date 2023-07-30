import express from "express";
import UserController from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/authentication.js";
import validator from "../Middleware/validator.js";
import checkValidation from "../Middleware/checkValidation.js";

const router = express.Router();

router.get("/", UserController.getAllUser);
router.post(
  "/register",
  validator.validateRegisterInputData(),
  checkValidation.checkValidation,
  UserController.register
);
router.post(
  "/login",
  validator.validateRegisterInputData(),
  checkValidation.checkValidation,
  UserController.login
);
router.post(
  "/refresh",
  validator.validateRegisterInputData(),
  checkValidation.checkValidation,
  UserController.refresh
);

export default router;
