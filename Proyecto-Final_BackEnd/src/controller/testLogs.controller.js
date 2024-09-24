import Logger from "../utils/winston.js";
export const testLogs = (req, res) => {
  Logger.fatal("Log Fatal");
  Logger.error("Log Error");
  Logger.warning("Log Warning");
  Logger.info("Log Info");
  Logger.http("Log http");
  Logger.debug("Log Debug");
  res.send("Probando en consola los logs");
};
