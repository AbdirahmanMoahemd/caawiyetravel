import Request from "../models/requestsModel.js";
import expressAsync from "express-async-handler";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import moment from 'moment'

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
      .populate("user")
      .sort({ createdAt: -1 });

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
    const request = await Request.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const createRequest = expressAsync(async (req, res) => {
  const {
    user,
    username,
    phone,
    project,
    title,
    owner,
    available,
    price,
    image,
    category,
    description,
  } = req.body;

  const myRequest = await Request.findOne({
    project: project,
    user: user,
  }).populate("user");

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
      const config = {
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      };

      let transporter = nodemailer.createTransport(config);

      var mailGenerator = new Mailgen({
        theme: "default",
        product: {
          // Appears in header & footer of e-mails
          name: "Mailgen",
          link: "https://mailgen.js/",
          // Optional product logo
          // logo: 'https://mailgen.js/img/logo.png'
        },
      });

      var start = new Date().getTime();
     

      var email = {
        body: {
          title: "Caawiye Consultant Ltd",
          intro: "NEW ORDER",
          table: {
            data: [
              {
                oderId: request._id,
                name: username,
                phone: phone,
                owner: owner,
                ordered_Date: moment(start).toString().substring(0, 28),
              },
            ],
          },

          outro: "MAHADSANID",
        },
      };

      var emailBody = mailGenerator.generate(email);

      let message = {
        from: process.env.EMAIL,
        to: "Cacoltd2021@gmail.com",
        subject: "NEW ORDER",
        html: emailBody,
      };

      transporter.sendMail(message);
      res.status(201).json(request);
    }
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

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateRequestToPaid = expressAsync(async (req, res) => {
  try {
    const { isPaid } = req.body;

    const request = await Request.findById(req.params.id);
    if (request) {
      request.isPaid = isPaid;
    }

    const updatedRequest = request.save();

    res.status(200).json(updatedRequest);
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
      res.status(200).json({
        message: "Removed Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
