import UserModel from "../Models/UserModel.js";
// import jwtService from "../utils/jwtService.js";
// import bcrypt from "bcrypt";
import createHttpError from "http-errors";

// const saltRounds = 5;

class UserService {
  async find(name) {
    try {
      const users = await UserModel.find({
        username: new RegExp("^" + name + "$", "i"),
      });

      return users;
    } catch (error) {
      return createHttpError[500](error.message || error);
    }
  }

  async findOne(id) {
    try {
      const user = await UserModel.findOne({
        id: id,
      });

      return user;
    } catch (error) {
      return createHttpError[500](error.message || error);
    }
  }
}

export default new UserService();
