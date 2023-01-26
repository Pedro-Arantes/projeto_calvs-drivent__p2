import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import paymentsService from "@/services/payments-service";
import { PostPaymentBody } from "@/protocols";

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const ticket_id = Number(req.query.ticketId);
  try {
    if (!ticket_id) {
      throw { name: "BadRequest" };
    }
    const result = await paymentsService.getPaymentService(req.userId, ticket_id);
    res.status(200).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "BadRequest") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    res.sendStatus(500);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const body: PostPaymentBody = req.body;

  try {
    if (!body.ticketId || !body.cardData) {
      throw { name: "BadRequest" };
    }
    const result = await paymentsService.postPaymentService(body, req.userId);
    res.status(200).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "BadRequest") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    res.sendStatus(500);
  }
}
