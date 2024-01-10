import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './create-client.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PartnersService } from '../partners/partners.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
} from '@nestjs/swagger';
import { E_INVALID_TOKEN } from '../common/errors';
import { Clients } from './clients.entity';

class getClients extends OmitType(Clients, ['partner']) {}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('clients')
@ApiUnauthorizedResponse({ description: E_INVALID_TOKEN })
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientService: ClientsService,
    private readonly partnerService: PartnersService,
  ) {}

  // Find all clients that the partner has submitted
  @Get()
  @ApiOkResponse({ description: 'List of clients', type: [getClients] })
  async findAll(@Request() req: any) {
    const partner = req.user; // returned from JwtAuthGuard.validate
    const clientList = await this.clientService.findAllWithPartner(partner);
    clientList.map((client) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = client;
      return rest;
    });
  }

  @Post()
  @ApiOkResponse({ description: 'Client created' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiBody({ type: CreateClientDto })
  create(
    @Request() req: any,
    @Body() createClientDto: CreateClientDto,
  ): Promise<void> {
    const partner = req.user; // returned from JwtAuthGuard.validate
    return this.clientService.create(createClientDto, partner);
  }
}
