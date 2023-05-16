import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    username: {
      type: String,
      require: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    title: {
      type: String,
      require: true,
    },
    owner: {
      type: String,
      require: true,
    },
    available: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
      default: 0.0,
    },
    category: {
      type: Number,
      require: true,
      default: 1,
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    orderedAt: {
      type: Number,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const Request = mongoose.model("requests", requestSchema);

export default Request;
