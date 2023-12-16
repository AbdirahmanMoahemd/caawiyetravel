import expressAsync from "express-async-handler";
import User from "../models/usersModel.js";
import generateToken from "../utils/generateToken.js";
import Project from "../models/projectModel.js";
import nodemailer from'nodemailer';
import randomstring from'randomstring';

export const login = expressAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("wishlist.project");

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        otp: user.otp,
        approved: user.approved,
        isVerified: user.isVerified,
        phone: user.phone,
        country: user.country,
        city: user.city,
        requests: user.requests,
        wishlist: user.wishlist,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtp = expressAsync((req, res) => {
  // app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Failed to send OTP");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send({message:"OTP sent successfully", otp:otp});
    }
  });
});

function generateOtp() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

export const verifyOtp = expressAsync((req, res) => {
  // app.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === req.user.otp) {
    res.status(200).send("OTP verification successful");
  } else {
    res.status(400).send("Invalid OTP");
  }
});

export const createUser = expressAsync(async (req, res) => {
  try {
    const { name, email, password, phone, city, country } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(404).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      city,
      country,
    });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        otp: user.otp,
        approved: user.approved,
        isVerified: user.isVerified,
        phone: user.phone,
        city: user.city,
        country: user.country,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ error: e.message });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const createBuyerUser = expressAsync(async (req, res) => {
  try {
    const { name, email, password, phone, city, country, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(404).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      city,
      country,
      role,
    });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        phone: user.phone,
        city: user.city,
        country: user.country,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: e.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getAllUser = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const users = await User.find({ ...keyword })
      .populate("wishlist.project")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateUser = expressAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body);
    if (user) {
      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const deletUser = expressAsync(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id, req.body);
    if (user) {
      res.status(200).json({ message: "SucessFully Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "wishlist.project"
    );
    const { token } = req.body;

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        phone: user.phone,
        country: user.country,
        city: user.city,
        token,
        requests: user.requests,
        wishlist: user.wishlist,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserRole = expressAsync(async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = role;
    }

    const updatedUser = user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const addToWishlist = expressAsync(async (req, res) => {
  try {
    const { id } = req.body;
    const project = await Project.findById(id);
    let user = await User.findById(req.params.id).populate("wishlist.project");

    if (user.wishlist.length == 0) {
      user.wishlist.push({ project });
    } else {
      let isProjectFound = false;
      for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].project._id.equals(project._id)) {
          isProjectFound = true;
        }
      }

      if (isProjectFound) {
        return res.status(400).json({ message: "Already added" });
      } else {
        user.wishlist.push({ project });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = expressAsync(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "wishlist.project"
    );
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.city = req.body.city || user.city;
      user.country = req.body.country || user.country;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        city: updatedUser.city,
        country: updatedUser.country,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updatePassword = expressAsync(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "wishlist.project"
    );
    if (user) {
      user.password = req.body.password || user.password;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        city: updatedUser.city,
        country: updatedUser.country,
      });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
