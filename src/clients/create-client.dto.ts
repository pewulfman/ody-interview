import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
export class CreateClientDto {
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly language: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly countryOfOrigin: string;

  @IsDefined()
  @IsString()
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
