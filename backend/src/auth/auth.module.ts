import { Module } from "@nestjs/common";
import { PrismaModule } from "prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.startegy";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      secret: "mySecret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
})
export class AuthModule {}
