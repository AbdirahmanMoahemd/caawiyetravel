import Request from "../models/requestsModel.js";
import expressAsync from "express-async-handler";


export const getRequests = expressAsync(async (req, res) => {
    try {
      const requests = await Request.find().populate("project");
  
      res.status(200).json(requests);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
});

export const getRequestById = expressAsync(async (req, res) => {
    try {
      const request = await Request.find(req.params.id).populate("project");
  
      res.status(200).json(request);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

export const createRequest = expressAsync(async (req, res) => {
    try {
      const { user, project } = req.body;
      const request = await Request.create({
        user,
        project
      });
      if (request) {
        res.json(request);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  
  export const updateRequestStatus = expressAsync(async (req, res) => {
    try {
      const { status } = req.body;
  
  
  
      const request = await Request.findById(req.params.id)
      if (request) {
        request.status = status;
        
      }
      
      const updatedRequest = request.save();
  
     
    
        res.json(updatedRequest);
      
    } catch (error) {
      res.status(404).json({ error: error.message });
      throw new Error("Request Not Found");
    }
  });