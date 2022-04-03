import { TicketSchema } from "./interfaces";

export const defaultState : TicketSchema[] = [{
    ticketId: "A1",
    concertName: "The Chatty Chellists",
    quantity: 10,
    price: 75,
},{
    ticketId: "A2",
    concertName: "Big Bill's Big Brass Band",
    quantity: 17,
    price: 55,
},
{
    ticketId: "A3",
    concertName: "Swift Stella's Saxophone Solos and Sonatas",
    quantity: 9,
    price: 90,
}]