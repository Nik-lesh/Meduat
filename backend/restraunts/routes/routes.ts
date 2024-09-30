import express from "express";
import { getRestraunt, getRestrauntById, PostReview } from "./controller";
import { upload } from "../multer/multer";
const routeRestraunt = express.Router();

routeRestraunt.get("/restaurant", getRestraunt);
routeRestraunt.get(`/:type/:id`, getRestrauntById);
routeRestraunt.post(`/:type/:id`, upload.single("image"), PostReview);
export default routeRestraunt;
