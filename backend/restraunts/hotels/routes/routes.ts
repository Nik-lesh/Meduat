import express from "express";
import getHotel from "./controller";
const routeHotel = express.Router();

routeHotel.get("/", getHotel);

export default routeHotel;
