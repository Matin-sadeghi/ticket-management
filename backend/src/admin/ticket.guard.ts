import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { TicketService } from "src/ticket/ticket.service";

@Injectable()
export class ticketGuard implements CanActivate {
  constructor(private ticketService: TicketService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const ticket = await this.ticketService.findTicketById(
      Number(req.params.id)
    );

    if (ticket.adminId == null || ticket.adminId == req.user.id) {
      if (req.user.role.includes("GENERALMANAGER", "ADMIN")) return true;
      if (req.user.role.includes(ticket.section)) return true;

      //   for (let j = 0; j < req.user.role.length; j++) {
      //     if (req.user.role[j] == ticket.section) {
      //       return true;
      //     }
      //   }
    }
    return false;
  }
}
