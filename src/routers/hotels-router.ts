import { Router } from "express";

import { getHotels, getHotelId } from "@/controllers/hotels-controller";

import { authenticateToken } from "@/middlewares";

const hotelsRouter = Router();

hotelsRouter
    .get('/hotels',authenticateToken, getHotels)
    .get('/hotels/:hotelId',authenticateToken, getHotelId);

export default hotelsRouter;
