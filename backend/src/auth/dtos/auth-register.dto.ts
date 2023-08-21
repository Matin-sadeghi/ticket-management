import { IsString, IsEmail, Length } from "class-validator";

export class AuthRegisterDto {
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(3, 255)
  password: string;
  @IsString()
  @Length(3, 255)
  confirmPassword: string;
}
