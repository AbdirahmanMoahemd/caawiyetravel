import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      require: true,
      default: 1,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    wishlist: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "projects",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

export default User;
