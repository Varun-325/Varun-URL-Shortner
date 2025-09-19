
import { nanoid } from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";
export const createShortUrl = async(req, res) => {
    try{
        const {customUrl,originalUrl,expiresAt,Title} = req.body;
        const userId = req.user.id; // Assuming user ID is available in req.user
        if(!originalUrl){
            console.log("Long URl not provided");
            return res.status(400).json({message:"Provide Original url"});
        }
        let shortCode;
        if(customUrl){
            shortCode=customUrl;
            const exist =ShortURL.findOne({
                shortCode,
            }); 
        if(exist){
            console.log("Custom url is already taken");
            return res.status(400).send({message:"Provide different custom url"});
        }
        }
        else{
            shortCode=nanoid(7);
            let exist = await ShortURL.findOne({
                shortCode,
            });
            while(exist){
                shortCode=nanoid(7);
                exist=await ShortURL.findOne({
                    shortCode,
                });
            }
            }
            const newUrl = new ShortURL({
                originalUrl,
                shortCode,
                userId,
            });
            await newUrl.save();
            return res.status(201).json(newUrl);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({message:"Server Error"});
    }
};
export const getLongUrl = async(req, res) => {
    try{
        const shortCode = req.params.shortcode;
        const exist = await ShortURL.findOne({shortCode:shortCode});


   if(!exist){
       console.log("Short code not found");
       res.status(404).send({ message : "BAD_REQUEST"});
   }


   return res.redirect(exist.originalUrl); // by default the status code is 302
   // return res.redirect(301,exist.originalUrl);


 } catch (error) {
   console.error(error);
   return res.status(500).json({ message: "Internal server error "});
 }
};