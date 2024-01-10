import { IsDate, IsEmail, IsString } from 'class-validator';
export class CreateClientDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly language: string;

  @IsString()
  readonly countryOfOrigin: string;

  @IsString()
  readonly countryOfDestination: string;

  @IsDate()
  readonly travelDateStart: Date;

  @IsDate()
  readonly travelDateEnd: Date;
}
