import { Router } from "express";

import { getHotels, getHotelId } from "@/controllers/hotels-controller";

import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter
    .all("/*", authenticateToken)
    .get('/', getHotels)
    .get('/:hotelId', getHotelId);

export default hotelsRouter;
