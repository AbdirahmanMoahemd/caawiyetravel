import mongoose from "mongoose";

import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONG_URL
    );

    console.log(`MongpDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

export default connectDB;
