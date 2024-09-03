import { TicketModel } from "./models/ticket.model.js";

export default class TicketDaoMongoDB {
    create = async (ticket) => {
        try {
            return await TicketModel.create(ticket);
        } catch (error) {
            throw new Error(error);
        }
    };

    getAll = async () => {
        try {
            return await TicketModel.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    getById = async (id) => {
        try {
            return await TicketModel.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    getByUserId = async (userId) => {
        try {
            return await TicketModel.find({ purchaser: userId });
        } catch (error) {
            throw new Error(error);
        }
    };
}