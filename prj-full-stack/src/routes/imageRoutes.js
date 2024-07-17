import express from "express";
export const router = express.Router();
import {filterImageFromURL, deleteLocalFiles} from '../util/util.js';

router.get( "/", async (req, res) => {

    const image_url = req.query.image_url.toString();

    if (!image_url) {
      res.status(404).send("Image URL is invalid");

    } else {
        const filterImage = await filterImageFromURL(image_url);
        res.status(200).sendFile(filterImage);
        res.on('finish', function () {
          deleteLocalFiles[filterImage];
        });
      }
    
  } );