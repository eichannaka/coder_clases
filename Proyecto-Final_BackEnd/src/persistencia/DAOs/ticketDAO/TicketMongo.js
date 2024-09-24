import ticketServices from "../../../services/ticket.services.js";

export default class TicketManager {
  async createTicker(data) {
    const { amount, purchaser } = data;
    if (!amount || !purchaser) {
      const message = {
        status: "error",
        message: "Faltan datos",
      };
      return message;
    }
    const generateCode = (length) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return code;
    };
    const ticket = {
      code: generateCode(5),
      amount,
      purchaser,
    };
    try {
      const createTicket = await ticketServices.createTicket(ticket);
      return createTicket;
    } catch (error) {
      console.log("createTicker MONGO", error);
      return error;
    }
  }
  async getTicketById(tid) {
    if (!tid) {
      return null;
    }
    try {
      const ticket = await ticketServices.getTicket(tid);
      if (!ticket) {
        return null;
      }
      return ticket;
    } catch (error) {
      console.log("getTicket MONGO", error);
      return error;
    }
  }
  async deleteTicketById(tid) {
    try {
      const deletedTicket = await ticketServices.deleteTicket(tid);
      if (!deletedTicket) {
        const response = {
          status: "error",
          message: "No se pudo eliminar el ticket",
        };
        return response;
      }
      return deletedTicket;
    } catch (error) {
      console.log("deleteTicketById MONGO", error);
      return error;
    }
  }
}
