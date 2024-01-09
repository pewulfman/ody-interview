import { Injectable } from '@nestjs/common';
import { PartnersService } from '../partners/partners.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private partnersService: PartnersService,
    private jwtService: JwtService,
  ) {}

  async validatePartners(username: string, pass: string): Promise<any> {
    const user = await this.partnersService.findOneByUsername(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(partner: any) {
    const payload = { username: partner.name, sub: partner.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
