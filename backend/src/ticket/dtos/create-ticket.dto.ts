import { Role } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class CreateTicketDto {
  @IsString()
  title: string;
  @IsEnum(Role)
  section: Role;
  @IsString()
  body: string;
}
