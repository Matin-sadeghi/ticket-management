import { IsEmail, Length } from "class-validator";

export class AuthLoginDto {
  @IsEmail()
  email: string;
  @Length(3, 255)
  password: string;
}
