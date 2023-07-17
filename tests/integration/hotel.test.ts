import { prisma } from "../../src/config/database";
import faker from "@faker-js/faker";
import supertest from 'supertest';
import app from '@/app';
import { createUser } from "../factories/users-factory";
import { createTicket, createTicketType } from "../factories/tickets-factory"
import { createEnrollmentWithAddress } from "../factories/enrollments-factory";
import { cleanDb, generateValidToken } from "../helpers";

const api = supertest(app)

beforeEach(async ()=>{
    await cleanDb()
})

// export async function createHotel(
//     name: string,
//     image: string,
//     createdAt:Date,
//     updatedAt: Date){
//     return await prisma.hotel.create({
//         data:{
//             name,
//             image,
//             createdAt,
//             updatedAt
//         }
//     })
// }

// export async function createRandomHotel(){
//     const name = faker.locale.toString()
//     const image = faker.image.city()
//     const createdAt = faker.date.past()
//     const updatedAt = faker.date.past()
// }

describe("Get /hotels",()=>{
    
    it("Retorna status 401 ao enviar token inválido?", async () =>{
        const retorno = await api.get("/hotels")
        expect(retorno.status).toBe(401)
    })

    it("Retorna status 404 se inscrição não existir?", async ()=>{
        const retorno = await api.get("/hotels")
        expect(retorno.status).toBe(404)
    })

    it("Retorna status 404 se ticket não existir?", async ()=>{
        const user = await createUser();
        const token = await generateValidToken(user);
        await createEnrollmentWithAddress(user)

        const retorno = await api.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(retorno.status).toBe(404)
    })

    it("Retorna 402 se ticket não foi pago?", async ()=>{
        const user = await createUser();
        const token = await generateValidToken(user);
        const enrollment = await createEnrollmentWithAddress(user);
        const ticketType = await createTicketType()
        await createTicket(enrollment.id, ticketType.id, 'RESERVED');

        const retorno = await api.get("/hotels").set('Authorization', `Bearer ${token}`)
        expect(retorno.status).toBe(402)
    })

    it("Retorna 402 se o tipo do ticket for remoto?", async ()=>{
        const retorno = await api.get("/hotels")
        expect(retorno.status).toBe(402)
    })

    it("Retorna 402 se o tipo do ticket não inclui hotel?", async ()=>{
        const retorno = await api.get("/hotels")
        expect(retorno.status).toBe(402)
    })

    it("Retorna status 404 se não existir hotéis?", async ()=>{
        const retorno = await api.get("/hotels")
        expect(retorno.status).toBe(404)
    })

    it("Retorna a lista de hotéis disponíveis no sucesso?", async ()=>{
        const retorno = await api.get("/hotels")
        expect(retorno.status).toBe(404)
    })
})

describe("GET /hotels/:id", ()=>{

    it("Retorna status 401 ao enviar token inválido?", async ()=>{
        const retorno = await api.get("/hotels/999999999")
        expect(retorno.status).toBe(401)
    })
    
    it("Retorna status 404 se inscrição não existir?", async ()=>{
        const user = await createUser();
        const token = await generateValidToken(user)
        expect().toBe(404)
    })

    // it("Retorna status 404 se ticket não existir?", async ()=>{

    //     expect().toBe(404)
    // })

    // it("Retorna status 404 se hotel não existir?", async ()=>{

    //     expect().toBe(404)
    // })

    // it("Retorna 402 se ticket não foi pago?", async ()=>{

    //     expect().toBe(402)
    // })

    // it("Retorna 402 se o tipo do ticket for remoto?", async ()=>{

    //     expect().toBe(402)
    // })

    // it("Retorna 402 se o tipo do ticket não inclui hotel?", async ()=>{

    //     expect().toBe(402)
    // })

    // it("Retorna o hotel com a lista de quartos?", async ()=>{

    //     expect().toBe()
    // })
})