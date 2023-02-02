import express from "express";
import UserController from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/authentication.js";

const router = express.Router();

router.get("/", authMiddleware.authentication, UserController.getAllUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/refresh", UserController.refresh);

export default router;
