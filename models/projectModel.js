import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
      default:0.0
    },
    category: {
      type: Number,
      require: true,
      default:1
    },
    image: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderedAt: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Projects", projectSchema);

export default Project;
