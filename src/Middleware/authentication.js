import jwtService from "../utils/jwtService.js";
import createHttpError from "http-errors";

let authentication = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const isAuth = await jwtService.verifyToken(token);
    if (isAuth) {
      next();
    } else {
      next(createHttpError[400]("Invalid token"));
    }
  } else {
    next(createHttpError[401]("Token required"));
  }
};

export default { authentication };
