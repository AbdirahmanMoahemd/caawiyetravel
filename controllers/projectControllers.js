import Project from "../models/projectModel.js";
import expressAsync from "express-async-handler";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

export const getProjects = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          owner: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const projects = await Project.find({ ...keyword }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUSAProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ approved: true,isPaid:true, category: 1 }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getUSAProjectsByAdmin = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ category: 1 }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getCANADAProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ approved: true,isPaid:true, category: 2 }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const getCANADAProjectsByAdmin = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ category: 2 }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getUnApprovedProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ approved: false }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getMyProjects = expressAsync(async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.id }).populate("user").sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const chargeToPay = expressAsync(async (req, res) => {
  
    const { price, gmail } = req.body
    const project = await Project.findById(req.params.id).populate("user");
    if (project) {
      project.chargedprice = price
      project.isCharged = true
      const updatedProject = project.save();
      // const config = {
      //   service: "gmail",
      //   auth: {
      //     user: process.env.EMAIL,
      //     pass: process.env.PASS,
      //   },
      // };
  
      // let transporter = nodemailer.createTransport(config);
  
      // var mailGenerator = new Mailgen({
      //   theme: "default",
      //   product: {
      //     // Appears in header & footer of e-mails
      //     name: "Mailgen",
      //     link: "https://mailgen.js/",
      //     // Optional product logo
      //     // logo: 'https://mailgen.js/img/logo.png'
      //   },
      // });
  
      // var email = {
      //   body: {
      //     title: "From Caawiye Consultant Ltd",
      //     name: `Dear ${project.user}`,
      //     intro: `We\'re very excited to have you!\nPlease pay \$${price} to approve your project.`,
          

         
  
      //     outro: "THANKS",
      //   },
      // };
  
      // var emailBody = mailGenerator.generate(email);
  
      // let message = {
      //   from: process.env.EMAIL,
      //   to: gmail,
      //   subject: "PAYMENT",
      //   html: emailBody,
      // };
  
      // transporter.sendMail(message);

      res.status(200).json(updatedProject);
    }

 
});


export const createProject = expressAsync(async (req, res) => {
  try {
    const {
      user,
      title,
      owner,
      available,
      price,
      image,
      category,
      description,
    } = req.body;
    const project = await Project.create({
      user,
      title,
      owner,
      available,
      price,
      category,
      image,
      description,
      
    });
    if (project) {
     
        // const config = {
        //   service: "gmail",
        //   auth: {
        //     user: process.env.EMAIL,
        //     pass: process.env.PASS,
        //   },
        // };
    
        // let transporter = nodemailer.createTransport(config);
    
        // var mailGenerator = new Mailgen({
        //   theme: "default",
        //   product: {
        //     // Appears in header & footer of e-mails
        //     name: "Mailgen",
        //     link: "https://mailgen.js/",
        //     // Optional product logo
        //     // logo: 'https://mailgen.js/img/logo.png'
        //   },
        // });
    
        // var email = {
        //   body: {
        //     name: "Caawiye Consultant Ltd",
        //     intro: "NEW PROJECT",
        //     table: {
        //       data: [
        //         {
        //           projectId: project._id,
        //           projectOwner: owner,
        //         },
        //       ],
        //     },
           
    
        //     outro: "MAHADSANID",
        //   },
        // };
    
        // var emailBody = mailGenerator.generate(email);
    
        // let message = {
        //   from: process.env.EMAIL,
        //   to: "Cacoltd2021@gmail.com",
        //   subject: "NEW PROJECT",
        //   html: emailBody,
        // };
    
        // transporter.sendMail(message);
      res.status(201).json(project);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const updateProject = expressAsync(async (req, res) => {
  try {
    const { title, owner, available, price, image, category, description } =
      req.body;

    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title;
      project.owner = owner;
      project.available = available;
      project.price = price;
      project.image = image;
      project.category = category;
      project.description = description;
      const updatedProject = project.save();

      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateProjectApproved = expressAsync(async (req, res) => {
  try {
    const { approved, isPaid } = req.body;

    const project = await Project.findById(req.params.id);
    if (project) {
      project.approved = approved;
      project.isPaid = isPaid;
    }

    const updatedProject = project.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const updateProjectToPaid = expressAsync(async (req, res) => {
  try {
   

    const project = await Project.findById(req.params.id).populate('user');
    if (project) {
     
      project.isPaid = true;
    }

    const updatedProject = project.save();
    if (updatedProject) {
    //   const config = {
    //     service: "gmail",
    //     auth: {
    //       user: process.env.EMAIL,
    //       pass: process.env.PASS,
    //     },
    //   };
  
    //   let transporter = nodemailer.createTransport(config);
  
    //   var mailGenerator = new Mailgen({
    //     theme: "default",
    //     product: {
    //       // Appears in header & footer of e-mails
    //       name: "Mailgen",
    //       link: "https://mailgen.js/",
    //       // Optional product logo
    //       // logo: 'https://mailgen.js/img/logo.png'
    //     },
    //   });
  
    //   var email = {
    //     body: {
    //       name: "Caawiye Consultant Ltd",
    //       intro: "Payment For Project Approvel",
    //       table: {
    //         data: [
    //           {
    //             projectOwner: project.owner,
    //             title: project.title,
    //             paidAmount: project.chargedprice
    //           },
    //         ],
            
    //       },
         
  
    //       outro: "MAHADSANID",
    //     },
    //   };
  
    //   var emailBody = mailGenerator.generate(email);
  
    //   let message = {
    //     from: process.env.EMAIL,
    //     to: "Cacoltd2021@gmail.com",
    //     subject: "Payment For Project Approvel",
    //     html: emailBody,
    //   };
  
    //   transporter.sendMail(message);
      
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Delete a product
// @route   GET /api/product/:id
// @access  Private/Admin
export const deleteProject = expressAsync(async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (project) {
      res.status(200).json({
        message: "project removed",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
