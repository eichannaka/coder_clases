import { messageModel } from "../persistencia/mongoDB/models/messages.model.js";

class MessageService {
  constructor(model) {
    this.model = model;
  }

  getAllMessages = async () => {
    const messages = await this.model.find();
    return messages;
  };
  createMessage = async (msg) => {
    const message = await this.model.create(msg);
    return message;
  };
}
const messageServices = new MessageService(messageModel);

export default messageServices;
