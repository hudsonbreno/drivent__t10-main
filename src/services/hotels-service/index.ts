import HotelsRepository from '@/repositories/hotel-repository/hotel-repository';
import enrollmentsService from '../enrollments-service';
import ticketService from '../tickets-service';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(user:number){

  const inscricao = await enrollmentsService.getOneWithAddressByUserId(user)
  if(!inscricao) throw Error("NotFound")

  const ticket = await ticketService.getTicketByUserId(user)
  if(!ticket) throw Error ("NotFound")

  if(ticket.status !== 'PAID') throw Error ('PaymentRequired');

  const ticketsTypes = await ticketsRepository.findTicketByEnrollmentId(inscricao.id)
  if (ticketsTypes.TicketType.isRemote === true || ticketsTypes.TicketType.includesHotel === false) {
    throw Error('PaymentRequired');
  }

  const hotels = await HotelsRepository.findHotelMany();

  if (!hotels) throw Error ('NotFound')
  return hotels

}

async function getHotelById(user: number, hotelId: number){

  const inscricao = await enrollmentsService.getOneWithAddressByUserId(user)
  if(!inscricao) throw Error("NotFound")

  const ticket = await ticketService.getTicketByUserId(user)
  if(!ticket) throw Error ("NotFound")

  if(ticket.status !== 'PAID') throw Error ('PaymentRequired');

  const ticketsTypes = await ticketsRepository.findTicketByEnrollmentId(inscricao.id)
  if (ticketsTypes.TicketType.isRemote === true || ticketsTypes.TicketType.includesHotel === false) {
    throw Error('PaymentRequired');
}

  const hotels = await HotelsRepository.findHotelMany();

  if (!hotels) throw Error ('NotFound')
  return hotels
} 

const hotelService = { getHotels, getHotelById };

export default hotelService;
