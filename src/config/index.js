import mongoose from "mongoose";

const url = "mongodb://127.0.0.1/ExpressJS";

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    return mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("connect database success");
        }
      }
    );
  } catch (e) {
    console.log("connect database fail");
  }
};

export default { connect };
