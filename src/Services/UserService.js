import UserModel from "../Models/UserModel.js";
import jwtService from "../utils/jwtService.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import redis from "../config/redis_connection.js";

const rfTokenLifeRedis = process.env.REFRESH_TOKEN_LIFE_REDIS;
class UserService {
  async find(rawName) {
    const name = rawName || "";
    const users = await UserModel.find({
      username: {
        $regex: name,
      },
    });
    console.log(name, users);
    return users;
  }

  async findOne(id) {
    const user = await UserModel.findOne({
      id: id,
    });
    return user;
  }

  async login(username, password) {
    try {
      const user = await UserModel.findOne({
        username: username,
      });

      if (!user) {
        throw new createHttpError[404]("Wronng username");
      }

      const isSamePassword = bcrypt.compareSync(password, user.password);
      if (!isSamePassword) {
        throw new createHttpError[404]("Wrong password");
      }

      const token = await jwtService.generateToken({
        id: user.id,
      });
      const refreshTokenGenerator = await jwtService.generateRefreshToken({
        id: user.id,
      });
      if (!token || !refreshTokenGenerator) {
        throw new createHttpError[500]("Token Error");
      }
      redis.client.set(
        user.id.toString(),
        refreshTokenGenerator.refreshToken,
        {
          EX: rfTokenLifeRedis,
        },
        (err, response) => {
          if (err) {
            throw new createHttpError[500]("Refresh token error");
          }
        }
      );
      await user.save();
      return {
        refreshTokenGenerator,
        token,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(data.password, salt);
    const newUser = await UserModel.create({
      username: data.username,
      password: hashPassword,
    });
    return newUser;
  }
}

export default new UserService();
