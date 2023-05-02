import mongoose from "mongoose";

const requestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("requests", requestSchema);

export default Request;
