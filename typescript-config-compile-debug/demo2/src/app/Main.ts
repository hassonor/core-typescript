import { TicketSchema } from '../interfaces';

export class Main {
    
    render() : string {

        return `
            <div class="mt-4">
              <h2>Globoticket Portal</h2>
              <table class="table-bordered">
              <thead>
                <th class="p-2">Concert Name</th>
                <th class="p-2">Price</th>
                <th class="p-2">Remaining Tickets</th>
              </thead>
              <tbody>

                    ${this.ticketInfo.map(ticket => `<tr>
                        <td class="p-2">${ticket.concertName}</td>
                        <td class="p-2">${ticket.price}</td>
                        <td class="p-2">${ticket.quantity}</td>
                    </tr>`).join("")}
              
              </tbody>
              
              </div>
              </table>
            </div>
        `;

    }

    constructor(private ticketInfo : TicketSchema[]) {}

}