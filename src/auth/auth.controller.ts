import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authServices.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = req.user;
    return result;
  }
}
