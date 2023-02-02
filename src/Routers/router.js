import courseRouter from "./course.routes.js";
import userRouter from "./user.routes.js";

// const mid = (req, res, next) => {
//   if (!req.query.id) {
//     next();
//   } else {
//     return res.status(403).json({
//       msg: "Unauthorized",
//     });
//   }
// };

const route = (app) => {
  app.use("/course", courseRouter);
  app.use("/user", userRouter);
};

export default route;
