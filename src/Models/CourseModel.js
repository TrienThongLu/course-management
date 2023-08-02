import mongoose from "mongoose";
import { db } from "../../src/config/index.js";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Course = new Schema(
  {
    name: { type: String, index: { unique: true } },
  },
  {
    versionKey: false,
  }
);

export default db.expressDB.model("Courses", Course);
