import { Request, Response } from 'express';
import httpStatus from 'http-status';
import hotelService from '@/services/hotels-service';
import { AuthenticatedRequest } from '@/middlewares';


export async function getHotels(req: AuthenticatedRequest, res: Response) {

  try {
    const Hotels = await hotelService.getHotels(req.userId);
    res.sendStatus(httpStatus.OK).send(Hotels)

  } catch (error) {

    if (error.name ==="NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    } else if (error.name === 'PaymentRequired'){
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    } else {
      res.sendStatus(httpStatus.BAD_REQUEST)
    }
  }
}

export async function getHotelId(req:AuthenticatedRequest, res: Response){
  const hotelId = req.params.hotelId
  
  try{
    const Hotel = await hotelService.getHotelById(req.userId,Number(hotelId));
    res.send(Hotel)
  } catch(error){
    if(error.name === 'DuplicatedEmailError'){
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.send(httpStatus.BAD_REQUEST).send(error);
  }
}