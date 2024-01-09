import { Injectable } from '@nestjs/common';
import { PartnersService } from '../partners/partners.service';

@Injectable()
export class AuthService {
  constructor(private partnersService: PartnersService) {}

  async validatePartners(username: string, pass: string): Promise<any> {
    const user = await this.partnersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
