import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { PartnersService } from '../partners/partners.service';

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
      new InternalServerErrorException('Partner not found');
    } else {
      return partner;
    }
  }
}
