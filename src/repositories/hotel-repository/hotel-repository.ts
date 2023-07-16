import { prisma } from '@/config';

async function findHotelMany(){
  return prisma.ticketType.findMany();
}

async function findHotelById(id: number) {
  return prisma.hotel.findUnique({
    where: {
      id
    },
    include: {
      Rooms: true,
    },
  });
}

const HotelsRepository = {
  findHotelMany,
  findHotelById,
};

export default HotelsRepository;