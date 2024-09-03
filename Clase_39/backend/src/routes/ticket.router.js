import { Router } from 'express';
import * as controller from '../controllers/ticket.controllers.js'
import { checkAuth } from '../middlewares/authJwt.js';

const router = Router();

router.post("/purchase", [checkAuth], controller.createPurchaseTicket);// Realizar compra y generacion del ticket

router.get("/", [checkAuth], controller.getAllTickets); // Obtener todos los tickets

router.get("/:tid", [checkAuth], controller.getTicketById); // Buscar por Id de ticket de compra

router.get("/user/:userId", [checkAuth], controller.getTicketsByUser); // Buscar por purchaser (email)


export default router;