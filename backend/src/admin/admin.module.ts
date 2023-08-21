import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { UserModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports:[PrismaModule,UserModule,TicketModule]
})
export class AdminModule {}
