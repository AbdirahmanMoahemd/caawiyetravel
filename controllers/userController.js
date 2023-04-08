import expressAsync from "express-async-handler";
import User from "../models/usersModel.js";

export const login = expressAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        phone: user.phone,
        address: user.address,
        country: user.country,
        city: user.city,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export const createUser = expressAsync(async (req, res) => {
  try {
    const { name, email, password, phone, address, city, country } = req.body;
    const user = new User({
        name,
        email,
        password,
        phone,
        address,
        city,
        country,
    });

    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const getAllUser = expressAsync(async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
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
      res.json(updatedUser);
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
      res.json({ message: "SucessFully Deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUserProfileById = async (req, res) => {
  const user = await User.findById(req.params.id);
  const { token } = req.body;

  if (user) {
    res.json({
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
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
};
