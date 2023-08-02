import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connect = async () => {
  try {
    console.log("uri", process.env.port);
    mongoose.set("strictQuery", false);
    const DatabaseExpress = mongoose.createConnection(
      process.env.URI_MONGODB_EXPRESSJS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("connect database express success");
        }
      }
    );

    const DatabaseUser = mongoose.createConnection(
      process.env.URI_MONGODB_USERS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("connect database user success");
        }
      }
    );
    return {
      DatabaseExpress,
      DatabaseUser,
    };
  } catch (e) {
    console.log(e);
    console.log("connect database fail");
  }
};

const connectDB = await connect();

export const db = { expressDB: connectDB.DatabaseExpress, userDB: connectDB.DatabaseUser };
