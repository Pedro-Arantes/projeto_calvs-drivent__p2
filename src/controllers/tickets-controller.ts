import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";

export async function getAllTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTicketService(req.userId);
    res.status(200).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.sendStatus(500);
  }
}
export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTicketTypesService();
    res.status(200).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    res.sendStatus(500);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const id: number = req.body.ticketTypeId;

  try {
    if (!id) throw { name: "BadRequest" };
    const result = await ticketsService.postTicketService(id, req.userId);

    res.status(201).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "BadRequest") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    res.sendStatus(500);
  }
}
