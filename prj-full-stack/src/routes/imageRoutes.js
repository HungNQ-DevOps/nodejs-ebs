import express from "express";
export const router = express.Router();
import fetch from "node-fetch";
import FileType from "file-type";
import {filterImageFromURL, deleteLocalFiles} from '../util/util.js';
import { StatusCodes, getReasonPhrase } from "http-status-codes";

router.get( "/", async (req, res) => {

    const image_url = req.query.image_url;

    if (!image_url) {
      res.status(StatusCodes.BAD_REQUEST).send({
        error: getReasonPhrase(StatusCodes.BAD_REQUEST),
        message: "The image URL is required"
      });

    } else {

        const resURL = await fetch(image_url);
        const arrBuff = await resURL.arrayBuffer();
        const buffer = Buffer.from(arrBuff);
        const checkType = await FileType.fromBuffer(buffer);    
        
        if (!checkType || checkType.ext!="jpg") {
          res.status(StatusCodes.BAD_REQUEST).send({
            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
            message: "The image type JPG is required"
          });
        } else {

          const filterImage = await filterImageFromURL(image_url);
          res.status(200).sendFile(filterImage);
          res.on('finish', function () {
            deleteLocalFiles[filterImage];
          });

        }

      }
    
  } );