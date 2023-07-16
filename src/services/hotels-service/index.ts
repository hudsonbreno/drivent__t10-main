import { Hotel } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import HotelsRepository from '@/repositories/hotel-repository/hotel-repository';

async function getHotels(){
  const hotel = await HotelsRepository.findHotelMany();
  if (!hotel) throw notFoundError();

  return hotel;
}

async function getHotelById(hotelId: number){
  return hotelId;
} 

const hotelService = { getHotels, getHotelById };

export default hotelService;
