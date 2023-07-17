import { prisma } from '@/config';

async function findHotelMany(){
  return prisma.hotel.findMany();
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