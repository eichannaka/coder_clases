import { ticketModel } from "../persistencia/mongoDB/models/ticket.model.js";
import Logger from "../utils/winston.js";

class TicketServices {
  constructor(model) {
    this.model = model;
  }

  createTicket = async (obj) => {
    try {
      const newTicket = await this.model.create(obj);
      return newTicket;
    } catch (error) {
      Logger.error("Error service createTicket", error);
    }
  };
  getTicket = async (tid) => {
    try {
      const ticket = await this.model.findById(tid);
      return ticket;
    } catch (error) {
      Logger.error("Error service getTicket", error);
    }
  };
  deleteTicket = async (tid) => {
    try {
      const deleteTicket = await this.model.remove({ _id: tid });
      return deleteTicket;
    } catch (error) {
      Logger.error("Error service deleteTicket", error);
    }
  };
}
const ticketServices = new TicketServices(ticketModel);

export default ticketServices;
