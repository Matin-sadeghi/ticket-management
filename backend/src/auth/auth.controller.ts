import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  NotFoundException,
  Query,
} from "@nestjs/common";

import { sendEmail } from "utils/mailer";

import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dtos/auth-register.dto";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthLoginDto } from "./dtos/auth-login.dto";
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { AuthForgetPasswordDto } from "./dtos/auth-forgetPassword.dto";
import { AuthResetPasswordDto } from "./dtos/auth-resetPassword.dto";
import { UserService } from "src/user/user.service";

@Controller("/auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Post("/register")
  async registerUser(@Body() body: AuthRegisterDto, @Res() res: Response) {
    const result = await this.authService.registerUser(body);
    if (!result) {
      throw new NotFoundException("User Not Found");
    }
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async loginHandler(
    @Req() req,
    @Body() body: AuthLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const access_token = this.jwtService.sign(
      {
        user: {
          userId: req.user.id,
          email: req.user.email,
          role: req.user.role,
        },
      },
      { expiresIn: "1d" }
    );

    const refresh_token = this.jwtService.sign(
      {
        user: {
          userId: req.user.id,
          email: req.user.email,
          role: req.user.role,
        },
      },
      { expiresIn: "3d" }
    );

    await this.userService.updateToken(req.user.id, refresh_token);

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 50 * 1000,
      secure: true,
    });
    return res
      .status(HttpStatus.OK)
      .json({ access_token, refresh_token, user: req.user });
  }

  @Post("/forget-password")
  async forgetPasswordHandler(
    @Body() body: AuthForgetPasswordDto,
    @Res() res: Response
  ) {
    const user = await this.userService.findUserByEmail(body);
    if (!user) throw new NotFoundException("User Not Exist");
    let token = this.jwtService.sign(
      { userId: user.id },
      {
        expiresIn: "1h",
      }
    );
    const link = `http://localhost:8000/auth/reset-password?token=${token}`;
    await sendEmail(
      user.email,
      user.username,
      `Forget Password`,
      `Click on the link below to reset your password.
            <a href=${link}>Reset Password</a>`
    );

    return res.status(HttpStatus.OK).json(link);
  }

  @Post("/reset-password")
  async resetPasswordHandler(
    @Query("token") token: string,
    @Body() body: AuthResetPasswordDto,
    @Res() res: Response
  ) {
    let decoded = this.jwtService.verify(token);

    const user = await this.authService.resetPassword(decoded.userId, body);
    if (!user) throw new NotFoundException("User Not Found");
    return res.status(HttpStatus.OK).json(user);
  }

  @Get("/token")
  async getToken(@Res() res: Response, @Req() req) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.sendStatus(401);
    } else {
      const user = await this.userService.findUserByRefreshToken(refreshToken);
      if (!user) {
        res.sendStatus(403);
      } else {
        const decode = await this.jwtService.verify(refreshToken);
        const access_token = this.jwtService.sign(
          {
            user: {
              userId: decode.user.id,
              email: decode.user.email,
              role: decode.user.role,
            },
          },
          { expiresIn: "1d" }
        );
        res.json({ access_token });
      }
    }
  }
}
