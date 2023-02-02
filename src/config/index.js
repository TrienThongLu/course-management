import mongoose from "mongoose";

const url =
  "mongodb+srv://thongluongweb:nzIIKYQEIe9KHznO@cluster0.0p8jrsm.mongodb.net/School?retryWrites=true&w=majority";

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("connect database fail");
  }
};

export default { connect };
