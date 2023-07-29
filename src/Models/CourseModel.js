import mongoose from "mongoose";

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

export default mongoose.model("Courses", Course);
