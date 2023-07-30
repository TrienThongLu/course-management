import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cookieParser from "cookie-parser";
import route from "./src/Routers/router.js";
import db from "./src/config/index.js";

const app = express();

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

route(app);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message || err,
  });
});

app.listen(5000, () => {
  console.log("App starting at port 5000");
});
