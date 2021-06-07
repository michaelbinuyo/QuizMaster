const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  const localUrl =
    // "mongodb+srv://emanuelone:85740014@cluster0.ogcs0.gcp.mongodb.net/projectLast?retryWrites=true&w=majority";
    //change URL for atlas
    "mongodb://127.0.0.1:27017/projectLast";
  const atlasUrl = process.env.MONGO_URL;

  try {
    const conn = mongoose.connect(atlasUrl || localUrl, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected to ${atlasUrl ? atlasUrl : localUrl}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
