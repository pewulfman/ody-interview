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
import {
  ApiBearerAuth,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from '@nestjs/swagger';
import {
  E_INCORRECT_EMAIL_OR_PASSWORD,
  E_INVALID_TOKEN,
} from '../common/errors';
import { Partners } from '../partners/partners.entity';

export class Token {
  @ApiProperty({ description: 'JWT token' })
  access_token: string;
}

export class Profile extends OmitType(Partners, [
  'password',
  'clients',
] as const) {}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Token })
  @ApiNotAcceptableResponse({ description: E_INCORRECT_EMAIL_OR_PASSWORD })
  async login(@Body() loginDto: LoginDto): Promise<Token> {
    return this.authServices.login(loginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: E_INVALID_TOKEN })
  @Get('profile')
  @ApiOkResponse({ description: 'Return Partners info', type: Profile })
  getProfile(@Request() req: any): Profile {
    // Remove password from response since @Exclude() is not working for now.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = req.user;
    return result;
  }
}
