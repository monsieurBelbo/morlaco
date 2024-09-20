import { IsString, IsEnum } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsEnum(['Personal', 'Business'])
  type: 'Personal' | 'Business';
}
