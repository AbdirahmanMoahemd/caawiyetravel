import expressAsync from "express-async-handler";
import User from "../models/usersModel.js";
import generateToken from "../utils/generateToken.js";
import Project from "../models/projectModel.js";

export const login = expressAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .populate("wishlist.project");

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        phone: user.phone,
        address: user.address,
        country: user.country,
        city: user.city,
        requests: user.requests,
        wishlist: user.wishlist,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createUser = expressAsync(async (req, res) => {
  try {
    const { name, email, password, phone, address, city, country } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(404).json({ msg: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      city,
      country,
    });
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        phone: user.phone,
        address: user.address,
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
    const { name, email, password, phone, address, city, country, role } =
      req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(404).json({ msg: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
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
        address: user.address,
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

export const getAllUser = expressAsync(async (req, res) => {
  try {
    const users = await User.find()
      .populate("wishlist.project");

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
      res.status(404).json({ msg: "User not found" });
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
      res.status(200).json({ msg: "SucessFully Deleted" });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUserProfileById = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("wishlist.project");
  const { token } = req.body;

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      approved: user.approved,
      phone: user.phone,
      address: user.address,
      country: user.country,
      city: user.city,
      token,
      requests: user.requests,
      wishlist: user.wishlist,
    });
  } else {
    res.status(404).json({ msg: "User not found" });
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
    res.status(404).json({ msg: "User not found" });
  }
});



export const addToWishlist = expressAsync(async (req, res) => {
  try {
    const { id } = req.body;
    const project = await Project.findById(id);
    let user = await User.findById(req.params.id)
      .populate("wishlist.project");

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
        return res.status(400).json({ msg: "Already added" });
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
