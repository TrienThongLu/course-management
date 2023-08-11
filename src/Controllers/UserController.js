import UserModel from "../Models/UserModel.js";
import jwtService from "../utils/jwtService.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import UserService from "../Services/UserService.js";
import redis from "../config/redis_connection.js";

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
      const { token, refreshTokenGenerator } = await UserService.login(
        req.body.username,
        req.body.password
      );
      return res
        .cookie(`refreshToken`, refreshTokenGenerator.refreshToken, refreshTokenGenerator.options)
        .json({
          msg: "login successfully",
          token: token,
        });
    } catch (error) {
      next(createHttpError[error.status || 500](error.message || error));
    }
  }

  async refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;
    const userData = await jwtService.decodeRefreshToken(refreshToken);
    if (!userData || !userData.userId || !refreshToken) {
      return res.status(404).json({
        msg: "Tokens error",
      });
    }

    const redisRFToken = await redis.client.get(userData.userId);
    if (!redisRFToken) {
      return res.status(404).json({
        msg: "Tokens error",
      });
    } else {
      if (redisRFToken !== refreshToken) {
        return res.status(404).json({
          msg: "Tokens error",
        });
      }
    }

    const newToken = await jwtService.generateToken({
      id: userData.id,
    });

    return res.json({
      token: newToken,
      refreshToken,
    });
  }
}

export default new UserController();
