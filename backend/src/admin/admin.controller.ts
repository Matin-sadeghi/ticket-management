import {
  Controller,
  Get,
  Param,
  Res,
  Post,
  Body,
  ParseIntPipe,
  Req,
  UseGuards,
  Patch,
  NotFoundException,
} from "@nestjs/common";
import { TicketService } from "src/ticket/ticket.service";
import { UserService } from "src/user/user.service";
import { AdminService } from "./admin.service";
import { switchRole } from "utils/switchRole";
import { Roles } from "./decorators/roles.decorator";
import { RolesGuard } from "./roles.guard";
import { ticketGuard } from "./ticket.guard";
import { UpdateRoleDto } from "./dtos/update-role.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { AnsweredTicketDto } from "./dtos/answered-ticket.dto";

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller("admin")
export class AdminController {
  constructor(
    public adminService: AdminService,
    public userService: UserService,
    public ticketService: TicketService
  ) {}

  @Roles("ADMIN", "GENERALMANAGER", "EDITOR", "WRITER")
  @Get("/is-admin")
  async isAdmin() {
    return true;
  }

  @Roles("ADMIN", "GENERALMANAGER")
  @Get("/users")
  async getUsers(@Res() res) {
    const users = await this.userService.findAllUsersWithFilleter();
    return res.json(users);
  }
  @Roles("GENERALMANAGER")
  @Get("/users/:id")
  async getUser(@Param("id", ParseIntPipe) id, @Res() res) {
    const user = await this.userService.findOneById(id);
    return res.json(user);
  }
  @Roles("GENERALMANAGER")
  @Patch("/users/:id/role")
  async updateUserRole(
    @Body() body: UpdateRoleDto,
    @Param("id", ParseIntPipe) id,
    @Res() res
  ) {
    const user = await this.userService.findOneByIdAndUpdateRole(
      id,
      body.roles
    );
    return res.json(user);
  }

  @Roles("ADMIN", "GENERALMANAGER", "EDITOR", "WRITER")
  @Get("/tickets")
  async getTickets(@Res() res, @Req() req) {
    const tickets = await this.ticketService.findAllTicketsToAnswered(
      req.user.role,
      req.user.id
    );

    return res.json(tickets);
  }
  @Roles("ADMIN", "GENERALMANAGER", "EDITOR", "WRITER")
  @UseGuards(ticketGuard)
  @Get("/tickets/:id")
  async getTicket(@Param("id", ParseIntPipe) id, @Req() req, @Res() res) {
    const ticket = await this.ticketService.findTicketByIdAndUpdateStatus(id);
    return res.json(ticket);
  }

  @Roles("ADMIN", "GENERALMANAGER", "EDITOR", "WRITER")
  @Patch("/tickets/:id")
  async answeredTicket(
    @Param("id", ParseIntPipe) id,
    @Req() req,
    @Res() res,
    @Body() body: AnsweredTicketDto
  ) {
    const ticket = await this.ticketService.answeredTicket(id, {
      ...body,
      userId: req.user.id,
    });

    if (!ticket) throw new NotFoundException("Ticket Not Found");

    return res.json(ticket);
  }
}
