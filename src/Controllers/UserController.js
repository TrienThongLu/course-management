import UserModel from "../Models/UserModel.js";
import jwtService from "../utils/jwtService.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import UserService from "../Services/UserService.js";

const saltRounds = 5;

class UserController {
  async getAllUser(req, res, next) {
    try {
      const users = await UserService.find(req.query.name);
      return res.status(200).json({
        users,
      });
    } catch (error) {
      next(createHttpError[error.status || 500](error.message || error));
    }
  }

  async register(req, res, next) {
    try {
      const newUser = await UserService.create(req.body);
      res.status(201).json({
        newUser,
      });
    } catch (error) {
      next(createHttpError[error.status || 500](error.message || error));
    }
  }

  async login(req, res, next) {
    try {
      const { token } = await UserService.login(req.body.username, req.body.password);
      return res.json({
        msg: "login successfully",
        token: token,
      });
    } catch (error) {
      next(createHttpError[error.status || 500](error.message || error));
    }
  }

  async refresh(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await jwtService.decodeToken(token);
    const refreshToken = req.body.refreshToken;
    if (!userData || !refreshToken) {
      return res.status(404).json({
        msg: "Tokens error",
      });
    }

    const username = userData.data.username;
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(404).json({
        msg: "Refresh token error",
      });
    }

    const newToken = await jwtService.generateToken({
      username: username,
    });

    return res.json({
      token: newToken,
      refreshToken,
    });
  }
}

export default new UserController();
