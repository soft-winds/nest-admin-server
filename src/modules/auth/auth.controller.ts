import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { QueryAuthDto } from './dto/auth.dto';
import { Public } from './auth.constants';
import { CreateUserDto } from '../system/user/dto/user.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() queryAuthDto: QueryAuthDto) {
    return this.authService.signin(queryAuthDto);
  }

  @Post('signout')
  signout(@Body() queryAuthDto: QueryAuthDto) {
    return this.authService.signout();
  }

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}
