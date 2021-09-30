import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { KeyConstants } from 'src/constants';
import { profileUserDto } from 'src/user/dto/profileUser.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: KeyConstants.jwt,
    });
  }

  async validate(payload: any) {
    return await this.userService.getUserById(payload.id)
  }
}