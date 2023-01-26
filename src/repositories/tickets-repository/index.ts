import { prisma } from "@/config";

async function findTicket(id: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id
    },
    include: {
      TicketType: true
    }
  });
}

async function findTicketType() {
  return prisma.ticketType.findMany();
}

async function findTicketTypeId(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id
    }
  });
}

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: "RESERVED"
    },
    include: {
      TicketType: true
    }
  });
}

async function findTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
}

async function updateTicketStatus(id: number) {
  return prisma.ticket.update({
    data: {
      status: "PAID"
    },
    where: {
      id
    }

  });
}

const ticketsRepository = {
  findTicket,
  findTicketType,
  postTicket,
  findTicketId,
  findTicketTypeId,
  updateTicketStatus
};

export default ticketsRepository;
