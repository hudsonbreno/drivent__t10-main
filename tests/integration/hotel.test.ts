import { prisma } from "../../src/config/database";
import faker from "@faker-js/faker";

export async function createHotel(
    name: string,
    image: string,
    createdAt:Date,
    updatedAt: Date){
    return await prisma.hotel.create({
        data:{
            name,
            image,
            createdAt,
            updatedAt
        }
    })
}

export async function createRandomHotel(){
    const name = faker.locale.toString()
    const image = faker.image.city()
    const createdAt = faker.date.past()
    const updatedAt = faker.date.past()
}

