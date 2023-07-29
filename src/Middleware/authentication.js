import jwtService from "../utils/jwtService.js";

let authentication = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const isAuth = await jwtService.verifyToken(token);
    if (isAuth) {
      return next();
    }
    return res.json({
      msg: "Login required",
    });
  } else {
    return res.status(404).json({
      msg: "Token required",
    });
  }
};

export default { authentication };
