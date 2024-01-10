import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
