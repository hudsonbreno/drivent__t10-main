import { Request, Response } from 'express';
import httpStatus from 'http-status';
import hotelService from '@/services/hotels-service';

export async function getHotels(req: Request, res: Response) {

  try {
    const Hotels = await hotelService.getHotels();
    res.sendStatus(httpStatus.OK).send(Hotels)

  } catch (error) {

    if (error.name ==="") {
      console.log("aqui no hotels")
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getHotelId(req:Request, res: Response){
  const hotelId = req.params.hotelId
  
  try{
    const Hotel = await hotelService.getHotelById(Number(hotelId));
    res.send(Hotel)
  } catch(error){
    if(error.name === 'DuplicatedEmailError'){
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.send(httpStatus.BAD_REQUEST).send(error);
  }
}