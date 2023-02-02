import jwtService from "../utils/jwtService.js";

let authentication = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const isAuth = await jwtService.verifyToken(token);
  if (isAuth) {
    return next();
  }
  return res.json({
    msg: "Login required",
  });
};

export default { authentication };
