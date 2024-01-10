import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
}
