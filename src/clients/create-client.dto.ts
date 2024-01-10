import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateClientDto {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsDefined()
  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  readonly language: string;

  @IsDefined()
  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  readonly countryOfOrigin: string;

  @IsDefined()
  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty()
  readonly countryOfDestination: string;

  @IsDefined()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly travelDateStart: Date;

  @IsDefined()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly travelDateEnd: Date;
}
