import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateTicketValidation } from "./validation/create-ticket.validation";
import { CreateTicketDto } from "./dtos/create-ticket.dto";
import { updateTicketDto } from "./dtos/update-ticket.dto";
import { Role } from "@prisma/client";
import { AnsweredTicketServiceDto } from "src/admin/dtos/answered-ticket.dto";

@Injectable()
export class TicketService {
  constructor(public prisma: PrismaService) {}
  async addNewTicket(data: CreateTicketDto, userId: number) {
    try {
      const newTicket = {
        userId,
        status: "UNSEEN",
        title: data.title,
        section: data.section,
        message: { text: data.body, side: "user", sender: userId },
      };

      await CreateTicketValidation.validate(newTicket);
      const ticket = await this.prisma.ticketSystem.create({
        data: {
          status: "UNSEEN",
          title: data.title,
          userId,
          section: data.section,
          message: {
            text: data.body,
            sender: userId,
            side: "user",
            createdAt: Date.now(),
          },
        },
      });

      return ticket;
    } catch (err) {
      throw new BadRequestException(err.response?.message || err.errors[0]);
    }
  }

  async userTickets(id: number) {
    const tickets = await this.prisma.ticketSystem.findMany({
      where: { userId: id },
      orderBy: { updatedAt: "desc" },
    });
    return tickets;
  }

  async findTicketById(id: number) {
    const ticket = await this.prisma.ticketSystem.findUnique({
      where: { id },
      include: { user: true, admin: true },
    });
    return ticket;
  }

  async findTicketByIdAndUpdateStatus(id: number) {
    const ticket = await this.prisma.ticketSystem.findUnique({
      where: { id },
      include: { user: true, admin: true },
    });
    await this.prisma.ticketSystem.update({
      where: { id },
      data: { status: ticket.status === "ANSWERED" ? "ANSWERED" : "SEEN" },
    });
    return ticket;
  }

  async updateTicket(ticketId: number, data: updateTicketDto, userId: number) {
    const ticket = await this.prisma.ticketSystem.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) throw new NotFoundException("ticket not found");
    const messages = ticket.message;
    if (data.body.length < 10)
      throw new BadRequestException("body must be more than 10 char");
    messages.push({
      text: data.body,
      sender: userId,
      side: "user",
      createdAt: Date.now(),
    });
    const updatedTicket = await this.prisma.ticketSystem.update({
      where: { id: ticketId },
      data: {
        message: messages,
        status: "UNSEEN",
      },
    });
    return updatedTicket;
  }
  async answeredTicket(id: number, data: AnsweredTicketServiceDto) {
    const ticket = await this.prisma.ticketSystem.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException("Ticket Not Found");
    }
    const messages = ticket.message;
    messages.push({
      text: data.text,
      sender: data.userId,
      side: "admin",
      createdAt: Date.now(),
    });

    const x = await this.prisma.ticketSystem.update({
      where: { id },
      data: {
        message: messages,
        adminId: ticket.adminId == null ? data.userId : ticket.adminId,
        status: "ANSWERED",
      },
    });
    console.log(x);

    return ticket;
  }

  async findAllTickets() {
    const tickets = await this.prisma.ticketSystem.findMany({
      include: {
        user: true,
        admin: true,
      },
      orderBy: { updatedAt: "desc" },
    });
    return tickets;
  }

  async findAllTicketsToAnswered(userRole: Role[], userId: number) {
    const allTickets = await this.findAllTickets();
    let tickets = [];
    let isSuperAdmin = false;
    for (let j = 0; j < userRole.length; j++) {
      if (userRole[j] == "ADMIN" || userRole[j] == "GENERALMANAGER") {
        isSuperAdmin = true;
      }
    }
    if (!isSuperAdmin) {
      allTickets.forEach((allTicket) => {
        for (let j = 0; j < userRole.length; j++) {
          if (
            userRole[j] == allTicket.section &&
            (allTicket.adminId == null || allTicket.adminId == userId)
          ) {
            tickets.push(allTicket);
          }
        }
      });
    } else {
      tickets = allTickets;
    }
    return tickets;
  }
}
