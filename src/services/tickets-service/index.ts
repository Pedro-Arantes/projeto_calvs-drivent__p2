import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketService(user_id: number) {
  const enrollment = await enrollmentRepository.findByUserId(user_id);
  if (!enrollment) {
    throw notFoundError();
  }
  const tickets = await ticketsRepository.findTicket(enrollment.id);
  if (!tickets) {
    throw notFoundError();
  }
  return tickets;
}

async function getTicketTypesService() {
  const tickets = await ticketsRepository.findTicketType();
  if (!tickets) {
    throw notFoundError();
  }
  return tickets;
}
async function postTicketService(id: number, user_id: number) {
  const enrollment = await enrollmentRepository.findByUserId(user_id);
  if (!enrollment) {
    throw notFoundError();
  }
  const tickets = await ticketsRepository.postTicket(enrollment.id, id);

  return tickets;
}

const ticketsService = {
  getTicketService,
  getTicketTypesService,
  postTicketService
};

export default ticketsService;
