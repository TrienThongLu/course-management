import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Course = new Schema(
  {
    _id: { type: ObjectId },
    name: { type: String, index: { unique: true } },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Course", Course);
