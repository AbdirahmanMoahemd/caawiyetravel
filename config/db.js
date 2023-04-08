import mongoose from "mongoose";

import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://abdirahmankaahiye25:abdirahmankaahiye25@ecommerce.myndhb3.mongodb.net/Travel?retryWrites=true&w=majority"
    );

    console.log(`MongpDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

export default connectDB;
