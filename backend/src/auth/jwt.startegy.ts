import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mySecret",
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOneByEmail(payload.user.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
