import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { PartnersService } from '../partners/partners.service';
import { E_PARTNER_NOT_FOUND } from '../common/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private partnersService: PartnersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const partner = await this.partnersService.findOneById(payload.sub);
    if (!partner) {
      new UnauthorizedException(E_PARTNER_NOT_FOUND);
    } else {
      return partner;
    }
  }
}
