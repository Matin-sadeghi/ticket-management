import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthRegisterValidation } from "./validation/auth-register.validation";
import * as bcrypt from "bcrypt";
import { AuthRegisterDto } from "./dtos/auth-register.dto";
import { AuthResetPasswordDto } from "./dtos/auth-resetPassword.dto";
import { AuthResetValidation } from "./validation/auth-reset.validation";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async registerUser(data: AuthRegisterDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (user) {
        throw new BadRequestException("User Already Exist");
      }
      await AuthRegisterValidation.validate(data);

      data.password = await bcrypt.hash(data.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          username: data.username,
          password: data.password,
          email: data.email,
        },
      });
      return newUser;
    } catch (err) {
      throw new BadRequestException(err.response?.message || err.errors[0]);
    }
  }

  async resetPassword(id: number, data: AuthResetPasswordDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) throw new NotFoundException("User Not Found");
      await AuthResetValidation.validate(data);
      data.password = await bcrypt.hash(data.password, 10);
      const newUser = await this.prisma.user.update({
        where: { id },
        data: { password: data.password },
      });
      return newUser;
    } catch (err) {
      throw new NotFoundException(err.response?.message || err.errors[0]);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }
}
