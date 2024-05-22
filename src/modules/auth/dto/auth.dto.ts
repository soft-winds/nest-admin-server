import { Exclude } from 'class-transformer';
import { IsNotEmpty, Length, IsString } from 'class-validator';

export class QueryAuthDto {
  @IsNotEmpty()
  @Length(4, 12)
  @IsString()
  username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @IsString()
  password: string;
}
