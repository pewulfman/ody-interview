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
  readonly email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly language: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly countryOfOrigin: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  readonly countryOfDestination: string;

  @IsDefined()
  @IsDate()
  @IsNotEmpty()
  readonly travelDateStart: Date;

  @IsDefined()
  @IsDate()
  @IsNotEmpty()
  readonly travelDateEnd: Date;
}
