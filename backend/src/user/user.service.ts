import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { AuthForgetPasswordDto } from "src/auth/dtos/auth-forgetPassword.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAllUsers() {
    const users = await this.prisma.user.findMany({});
    return users;
  }
  async findAllUsersWithFilleter() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        img: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy:{id:"desc"}
    });
    return users;
  }
  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException("User Not Found");
    }
    return user;
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw new NotFoundException("User Not Found");
    }
    return user;
  }

  async findOneByIdAndUpdateRole(id: number, roles) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { role: roles },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findUserByRefreshToken(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { refresh_token: refreshToken },
    });
    if (!user) throw new BadRequestException("Not Found Refresh Token");
    return user;
  }

  async findUserByEmail(data: AuthForgetPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new NotFoundException("User not Exist");
    return user;
  }

  async updateToken(id: number, refresh_token: string) {
    await this.prisma.user.update({
      where: { id },
      data: { refresh_token },
    });
  }
}
