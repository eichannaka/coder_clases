import messageService from "../../../services/messages.services.js";

export default class MessageManager {
  async getMessages() {
    try {
      const messages = await messageService.getAllMessages();
      return messages;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async saveMessage(data) {
    if (!data) {
      const message = "Porfavor escriba el mensaje";
      return message;
    }
    try {
      const messages = await messageService.createMessage(data);
      return messages;
    } catch (error) {
      console.log("saveMessage MONGO", error);
      return error;
    }
  }
}
