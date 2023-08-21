import { IsString } from "class-validator";

export class AnsweredTicketDto {
  @IsString()
  text: string;
}

export class AnsweredTicketServiceDto {
  text: string;
  userId: number;
}
