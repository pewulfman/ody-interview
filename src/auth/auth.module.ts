import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PartnersModule } from '../partners/partners.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PartnersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
