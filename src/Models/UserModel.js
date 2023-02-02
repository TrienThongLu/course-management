import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema(
  {
    _id: { type: ObjectId },
    username: { type: String, index: { unique: true } },
    password: { type: String },
    refreshToken: { type: String },
    courseIds: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("User", User);
