import { nanoid } from "nanoid";

import { ShortURL } from "../models/shorturl.model.js";
import { isObjectIdOrHexString } from "mongoose";

export const generateShortURLController = async (req, res) => {
  console.log(req.body);

  const longURL = req.body.originalUrl;

  if (!longURL) {
    console.error("Long URL not provided in the request body.");
    return res.status(400).json({
      status: "BAD_REQUEST",
      message: "Long URL is required",
    });
  }

  const shortURL = nanoid(10);

  const newShortURL = new ShortURL({
    originalUrl: longURL,
    shortCode: shortURL,
    userId: req.user.id,
  });

  await newShortURL.save();

  console.log("Generating short URL for:", req.body);
  res.status(200).json({
    status: "success",
    message: "Short URL generated successfully",
    data: {
      shortURL: shortURL,
      longURL: longURL,
    },
  });
};

export const getShortURLController = async (req, res) => {
  const { shortURL } = req.params;

  if (!shortURL) {
    console.error("Short URL not provided in the request parameters.");
    return res.status(400).json({
      status: "BAD_REQUEST",
      message: "Short URL is required",
    });
  }

  try {
    const urlRecord = await ShortURL.findOne({ shortCode: shortURL });
    if (!urlRecord) {
      console.error("Short URL not found in the database.");
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }
    console.log("Redirecting to original URL:", urlRecord.originalUrl);
    res.redirect(urlRecord.originalUrl);
  } catch (error) {
    console.error("Error fetching short URL from the database:", error);
    res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error fetching short URL",
    });
  }
};

export const updateShortURLController = async (req, res) => {
  try {
    const { shortURL} = req.params;

    const updatedData = req.body
    
    const existed = await ShortURL.findOne({shortCode: shortURL});
    if(!existed){
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }

    
    const updatedRecord = await ShortURL.findOneAndUpdate({
      shortCode: shortURL
    }, {...updatedData}, {new: true})
    res.status(200).json({
      status: "success",
      data: 'Record updated successfully',
    })

  }catch (error) {
    console.error("Error updating short URL:", error);
    res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error updating short URL",
    })
  }
}

export const deleteShortURLController = async (req, res) => {
  try {
    const {shortUrl} = req.params

    const existed = await ShortURL.findOne({shortCode: shortUrl});
    if(!existed){
      return res.status(404).json({
        status: "NOT_FOUND",
        message: "Short URL not found",
      });
    }
    
 
    existed.isActive = false;
    await existed.save();

 

    res.status(200).json({
      status: "success",
      message: "Short URL deleted successfully",
    });
  }catch(error){
    console.error("Error deleting short URL:", error);
    res.status(500).json({
      status: "INTERNAL_SERVER_ERROR",
      message: "Error deleting short URL",
    })
  }
}