const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  const url = "mongodb://127.0.0.1:27017/projectLast";
  // mongodb+srv://emanuelone:85740014@cluster0.ogcs0.gcp.mongodb.net/projectLast?retryWrites=true&w=majority
  try {
    const conn = mongoose.connect(process.env.LOCAL_DB || url, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected ${(await conn).connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
