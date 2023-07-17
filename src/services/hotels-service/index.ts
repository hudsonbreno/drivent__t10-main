import { Hotel } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import HotelsRepository from '@/repositories/hotel-repository/hotel-repository';

async function getHotels(){
  const hotels = await HotelsRepository.findHotelMany();
  if (!hotels) throw notFoundError();

  return hotels;
}

async function getHotelById(hotelId: number){
  const hotel = await HotelsRepository.findHotelById(hotelId);
  if (!hotel) throw notFoundError();
  
  return hotel
} 

const hotelService = { getHotels, getHotelById };

export default hotelService;
