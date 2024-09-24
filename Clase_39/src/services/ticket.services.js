import { ticketModel } from "../persistencia/mongoDB/models/ticket.model.js";

class TicketServices {
  constructor(model) {
    this.model = model;
  }

  createTicket = async (obj) => {
    const newTicket = await this.model.create(obj);
    return newTicket;
  };
  getTicket = async (tid) => {
    const ticket = await this.model.findById(tid);
    return ticket;
  };
  deleteTicket = async (tid) => {
    const deleteTicket = await this.model.remove({ _id: tid });
    return deleteTicket;
  };
}
const ticketServices = new TicketServices(ticketModel);

export default ticketServices;
