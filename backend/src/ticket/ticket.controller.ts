import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dtos/create-ticket.dto";
import { updateTicketDto } from "./dtos/update-ticket.dto";

@Controller("/ticket")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Get("/get-all-user-tickets")
  @UseGuards(JwtAuthGuard)
  async getAllTickets(@Req() req, @Res() res) {
    const tickets = await this.ticketService.userTickets(req.user.id);
    return res.json(tickets);
  }

  @Post("/create-ticket")
  @UseGuards(JwtAuthGuard)
  async createTicket(@Req() req, @Res() res, @Body() body: CreateTicketDto) {
    const ticket = await this.ticketService.addNewTicket(body, req.user.id);
    return res.json(ticket);
  }

  @Get("/get-ticket/:id")
  @UseGuards(JwtAuthGuard)
  async getTicket(
    @Req() req,
    @Res() res,
    @Param("id", new ParseIntPipe()) id: number
  ) {
    const ticket = await this.ticketService.findTicketById(id);
    if (req.user.id !== ticket.userId)
      throw new BadGatewayException("not your ticket");

    return res.status(HttpStatus.OK).json(ticket);
  }

  @Post("/update-ticket/:id")
  @UseGuards(JwtAuthGuard)
  async updateTicket(
    @Param("id", new ParseIntPipe()) id: number,
    @Req() req,
    @Res() res,
    @Body() body: updateTicketDto
  ) {
    const ticket = await this.ticketService.updateTicket(id, body, req.user.id);
    return res.json(ticket);
  }
}
