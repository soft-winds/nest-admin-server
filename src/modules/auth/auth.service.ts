import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { QueryAuthDto } from './dto/auth.dto';
import { UserService } from '../system/user/user.service';
import { isNull } from 'lodash';
import { ErrorEnum } from 'src/enum/error.enum';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../system/user/dto/user.dto';
import { jwtConstants } from './auth.constants';
@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UserService,
    private jwtService: JwtService,
  ) {}
  // 登录
  async signin(queryAuthDto: QueryAuthDto) {
    const { username, password } = queryAuthDto;
    const user = await this.userSerivce.findOneByUsername(username);

    if (isNull(user)) {
      throw new ForbiddenException(ErrorEnum.USER_NOT_FOUND);
    }

    const verifyPasswrod = await argon2.verify(user.password, password);
    if (!verifyPasswrod) {
      throw new ForbiddenException(ErrorEnum.USER_OR_PASSWOR_ERROR);
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  //   注册
  async signup(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.userSerivce.findOneByUsername(username);
    if (!isNull(user)) {
      throw new UnauthorizedException(ErrorEnum.USER_IS_FOUND);
    }
    const res = await this.userSerivce.create(createUserDto);
    delete res.password;
    return res;
  }

  //   登出
  signout() {}

  //  重置密码
  resetPassword() {
    // 重置密码的逻辑
  }
}
