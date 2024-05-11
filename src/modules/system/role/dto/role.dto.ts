import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
} from 'class-validator';
import { PageDto } from 'src/common/dto/page.dto';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsInt()
  status: number;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  remark: string;
}
export class UpdateRoleDto extends CreateRoleDto {}
export class QueryRoleDto extends PageDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsInt()
  status: number;
}
