import { recoveryModel } from "../persistencia/mongoDB/models/recovery.model.js";

class RecoveryService {
  constructor(model) {
    this.model = model;
  }
  addExpiresDate = async (obj) => {
    const date = await this.model.create(obj);
    return date;
  };

  getExpiresDate = async () => {
    const date = await this.model.find();
    return date;
  };
}
const recoveryService = new RecoveryService(recoveryModel);

export default recoveryService;
