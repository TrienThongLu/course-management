import UserModel from "../Models/UserModel.js";
import jwtService from "../utils/jwtService.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

const saltRounds = 5;

class UserController {
  async getAllUser(req, res, next) {
    try {
      await UserModel.find({})
        .then((users) => {
          return res.json(users);
        })
        .catch((e) => {
          next(createHttpError[404]("User Not Found"));
        });
    } catch (error) {
      next(createHttpError[500](error.message || error));
    }
  }

  async register(req, res) {
    try {
      const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const postedUser = {
        username: req.body.username,
        password: hashPassword,
      };
      await UserModel.create(postedUser)
        .then(() => {
          return res.json({
            msg: "Registered",
          });
        })
        .catch((e) => {
          if (e.code === 11000) {
            return res.json({
              error: "Name already exists",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res) {
    const user = await UserModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.json({
        msg: "User not found",
      });
    }

    const isSamePassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isSamePassword) {
      return res.json({
        msg: "Wrong password",
      });
    }

    const token = await jwtService.generateToken({
      username: user.username,
    });

    const refreshTokenGenerator = await jwtService.generateRefreshToken(token);

    if (!token || !refreshTokenGenerator) {
      return res.json({
        msg: "Tokens error",
      });
    }

    user.refreshToken = refreshTokenGenerator.refreshToken;
    await user.save();

    return res
      .cookie(
        `refreshToken`,
        refreshTokenGenerator.refreshToken,
        refreshTokenGenerator.options
      )
      .json({
        msg: "login successfully",
        token: token,
      });
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
