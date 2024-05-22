import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { PageDto } from 'src/common/dto/page.dto';
import { Role } from '../../role/entities/role.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Expose()
  @IsArray()
  @IsOptional()
  @Transform(({ value: val }) => (val ? val : [3]), {
    toClassOnly: true,
  })
  role?: Role[];
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class QueryUserDto extends PageDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  nicename: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  email: string;
}

export class UpdatePerfileDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  nicename: string;

  @IsString()
  @IsOptional()
  avatar: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(2)
  gender: number;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsInt()
  @IsOptional()
  status: number;
}
