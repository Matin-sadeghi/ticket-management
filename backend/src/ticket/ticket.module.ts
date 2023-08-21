import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  exports:[TicketService],
  imports:[PrismaModule]
})
export class TicketModule {}
