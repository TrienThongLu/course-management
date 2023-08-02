import mongoose from "mongoose";
import { db } from "../../src/config/index.js";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.ObjectId;

const User = new Schema(
  {
    username: { type: String, index: { unique: true }, required: true, lowercase: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    courseIds: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

export default db.userDB.model("Users", User);
