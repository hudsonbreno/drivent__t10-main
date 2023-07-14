import { Hotel } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import HotelsRepository from '@/repositories/tickets-repository';

async function getHotels(){
  const ticketTypes = await HotelsRepository.findTicketTypes();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function getHotelById(userId: number){
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const hotel = await HotelsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!hotel) throw notFoundError();

  return hotel;
} 

const hotelService = { getHotels, getHotelById };

export default hotelService;
