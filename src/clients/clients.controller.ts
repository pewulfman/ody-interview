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

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientService: ClientsService,
    private readonly partnerService: PartnersService,
  ) {}

  // Find all clients that the partner has submitted
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    const partner = req.user; // returned from JwtAuthGuard.validate
    return this.clientService.findAllWithPartner(partner);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req: any, @Body() createClientDto: CreateClientDto) {
    const partner = req.user; // returned from JwtAuthGuard.validate
    return this.clientService.create(createClientDto, partner);
  }
}
