import UserModel from "../Models/UserModel.js";
// import jwtService from "../utils/jwtService.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

const saltRounds = 5;

class UserService {
  async find(rawName) {
    const name = rawName || "";
    const users = await UserModel.find({
      username: new RegExp("^" + name + "$", "i"),
    });

    return users;
  }

  async findOne(id) {
    const user = await UserModel.findOne({
      id: id,
    });
    return user;
  }

  async login(username, password) {
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
  }

  async create(data) {
    const hashPassword = bcrypt.hashSync(data.password, saltRounds);
    const newUser = await UserModel.create({
      username: data.username,
      password: hashPassword,
    });
    return newUser;
  }
}

export default new UserService();
