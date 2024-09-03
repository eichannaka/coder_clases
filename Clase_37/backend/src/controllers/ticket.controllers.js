import * as ticketService from "../services/ticket.service.js";
import { HttpResponse } from "../utils/http.response.js";

const httpResponse = new HttpResponse();

//Crear un nuevo Ticket
export const createPurchaseTicket = async (req, res, next) => {
    try {
       const user = req.user;
       const ticket = await ticketService.createPurchaseTicket(user);
       if(!ticket) return httpResponse.NotFound(res, "Error creating purchase ticket");
       else return httpResponse.Ok(res, ticket);
       //createResponse(res, 201, 'Purchase ticket generated successfully: ' + ticket._id);
    } catch (error) {
        next(error);
    }
};

//Obtener todos los tickets
export const getAllTickets = async (req, res, next) => {
    try {
        const tickets = await ticketService.getAllTickets();

        if(!tickets || tickets.length === 0) {
            return httpResponse.NotFound(res, "Tickets Not Found");
            //return res.status(404).json({ msg: "Tickets Not Found" });
        }

        return httpResponse.Ok(res, tickets);
        //res.status(200).json({ msg: "Tickets retrieved successfully", tickets })
    } catch (error) {
        next(error);
    }
};

//Obtener tickets por ID
export const getTicketById = async (req, res, next) => {
    try {
        const { tid } = req.params;
        const ticket = await ticketService.getTicketsById(tid);

        if(!ticket) {
            return httpResponse.NotFound(res, "Ticket not found");
            //return res.status(404).json({ msg: "Ticket not found" });
        }

        return httpResponse.Ok(res, ticket);
        //res.status(200).json({ msg: "Ticket retrieved successfully", ticket })
    } catch (error) {
        next(error);
    }
};

//Obtener tickets por usuario

export const getTicketsByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if(!userId) {
            return httpResponse.BadRequest(res, "User ID is required");
            //return res.status(400).json({ msg: "User ID is required" });
        }

        const tickets = await ticketService.getTicketsByUser(userId);

        if(!tickets || tickets.length === 0) {
            return httpResponse.NotFound(res, "No tickets found for this user");
            //return res.status(404).json({ msg: "No tickets found for this user" });
        }

        return httpResponse.Ok(res, tickets);
        //res.status(200).json({ msg: "Tickets retrieved successfully", tickets })
    } catch (error) {
        next(error);
    }
};