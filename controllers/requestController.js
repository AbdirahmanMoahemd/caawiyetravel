import Request from "../models/requestsModel.js";
import expressAsync from "express-async-handler";

export const getRequests = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          username: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const requests = await Request.find({ ...keyword })
      .populate("project")
      .populate("user").sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getRequestById = expressAsync(async (req, res) => {
  try {
    const request = await Request.find(req.params.id)
      .populate("project")
      .populate("user");

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getMyRequests = expressAsync(async (req, res) => {
  try {
    const request = await Request.find({ user: req.params.id }).sort({ createdAt: -1 });

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const createRequest = expressAsync(async (req, res) => {
  try {
    const {
      user,
      username,
      project,
      title,
      owner,
      available,
      price,
      image,
      category,
      description,
    } = req.body;

    const myRequest = await Request.findOne({ project: project , user:user });

    if (myRequest) {
      res.status(404).json({ message: "Already added" });
    } else {
      const request = await Request.create({
        user,
        username,
        project,
        title,
        owner,
        available,
        price,
        image,
        category,
        description,
        orderedAt: new Date().getTime(),
      });
      if (request) {
        res.json(request);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateRequestStatus = expressAsync(async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);
    if (request) {
      request.status = status;
    }

    const updatedRequest = request.save();

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// @desc    Delete a request
// @route   GET /api/request/:id
// @access  Private/Admin
export const deleteRequest = expressAsync(async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (request) {
      res.json({
        message: "Removed Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
