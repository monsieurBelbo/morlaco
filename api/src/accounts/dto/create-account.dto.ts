import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  currency: string;

  @IsNumber()
  initialBalance: number;

  @IsString()
  type: string;

  @IsBoolean()
  isOwn: boolean;
}
