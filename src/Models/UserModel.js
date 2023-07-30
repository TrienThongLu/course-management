import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema(
  {
    username: { type: String, index: { unique: true }, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    courseIds: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

export default mongoose.model("Users", User);
