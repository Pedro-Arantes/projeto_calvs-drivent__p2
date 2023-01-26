import { getAllTickets, getTicketsTypes, postTickets } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getAllTickets)
  .post("/", postTickets);

export { ticketsRouter };  
