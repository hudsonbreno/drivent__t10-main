import { prisma } from "../../src/config/database";

export async function createBook(
    name: string,
    image: string, 
    createdAt: Date,
    updatedAt: Date
    ) {
    return await prisma.hotel.create({
        data:{
            name,
            image,
            createdAt,
            updatedAt
        }
    })
}