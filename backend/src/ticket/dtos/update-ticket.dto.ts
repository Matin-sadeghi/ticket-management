import { IsString } from "class-validator";

export class updateTicketDto {
  @IsString()
  body: string;
}
