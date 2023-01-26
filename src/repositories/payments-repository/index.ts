import { prisma } from "@/config";
import { PostPaymentBody } from "@/protocols";

async function findPayment(id: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: id
    }
  });
}

async function insertPayment(body: PostPaymentBody, price: number, last: string) {
  return prisma.payment.create({
    data: {
      ticketId: body.ticketId,
      value: price,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: last
    }
  });
}

const paymentsRepository = {
  findPayment,
  insertPayment
};

export default paymentsRepository;
