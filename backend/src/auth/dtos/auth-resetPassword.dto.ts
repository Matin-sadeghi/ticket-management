import { IsString, Length } from "class-validator";

export class AuthResetPasswordDto {
  @IsString()
  @Length(3, 255)
  password: string;
  @IsString()
  @Length(3, 255)
  confirmPassword: string;
}
