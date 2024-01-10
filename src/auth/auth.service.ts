import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PartnersService } from '../partners/partners.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import { E_INCORRECT_EMAIL_OR_PASSWORD } from '../common/errors';

@Injectable()
export class AuthService {
  constructor(
    private partnersService: PartnersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.partnersService.findOneByUsername(
      loginDto.username,
    );
    if (!user) throw new NotAcceptableException(E_INCORRECT_EMAIL_OR_PASSWORD);
    if (!(user.password === loginDto.password))
      throw new NotAcceptableException(E_INCORRECT_EMAIL_OR_PASSWORD);
    return {
      access_token: this.jwtService.sign({ username: user.name, sub: user.id }),
    };
  }
}
