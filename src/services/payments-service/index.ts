import { notFoundError, unauthorizedError } from "@/errors";
import { PostPaymentBody } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentsRepository from "@/repositories/payments-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getPaymentService(user_id: number, ticket_id: number) {
  const enrollment = await enrollmentRepository.findByUserId(user_id);
  const tickets = await ticketsRepository.findTicketId(ticket_id);
  if (!tickets) {
    throw notFoundError();
  }
  if (enrollment.id !== tickets.enrollmentId) {
    throw unauthorizedError();
  }
  const payment = await paymentsRepository.findPayment(ticket_id);
  if (!payment) {
    throw notFoundError();
  }
  return payment;
}

async function postPaymentService(body: PostPaymentBody, user_id: number) {
  let last = body.cardData.number.toString();
  last = last.slice(-4);
  const enrollment = await enrollmentRepository.findByUserId(user_id);
  const ticket = await ticketsRepository.findTicketId(body.ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }
  const TypeTicket = await ticketsRepository.findTicketTypeId(ticket.ticketTypeId);
  const payment = await paymentsRepository.insertPayment(body, TypeTicket.price, last);
  await ticketsRepository.updateTicketStatus(body.ticketId);
  return payment;
}

const paymentsService = {
  getPaymentService,
  postPaymentService
};

export default paymentsService;
