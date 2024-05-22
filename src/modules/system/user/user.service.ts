import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  QueryUserDto,
  UpdatePerfileDto,
  UpdateUserDto,
} from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Like, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: Partial<CreateUserDto>) {
    const role = await this.roleRepository.find({
      where: { id: In(createUserDto.role) },
    });

    createUserDto.role = role;
    // 密码加密
    createUserDto.password = await argon2.hash(createUserDto.password);
    const data = await this.userRepository.create(createUserDto);
    return this.userRepository.save(data);
  }

  async findAll(queryUserDto: QueryUserDto) {
    const { page, pageSize, phoneNumber, email, username, nicename } =
      queryUserDto;

    const where = {
      ...(phoneNumber ? { phoneNumber: Like(`%${phoneNumber}%`) } : null),
      ...(email ? { email: Like(`%${email}%`) } : null),
      ...(username ? { username: Like(`%${username}%`) } : null),
      ...(nicename ? { nicename: Like(`%${nicename}%`) } : null),
    };
    const [data, total] = await this.userRepository.findAndCount({
      where,
      select: ['id', 'createTime', 'updateTime', 'username', 'role', 'perfile'],
      relations: {
        role: true,
        perfile: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return { total, data };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'createTime', 'updateTime', 'username', 'role', 'perfile'],
      relations: { role: true, perfile: true },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({
      select: ['username', 'password', 'perfile', 'role', 'id'],
      where: { username },
      relations: { role: true, perfile: true },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async updatePerfile(updatePerfileDto: UpdatePerfileDto) {
    const { userId, ...perfile } = updatePerfileDto;
    const user = await this.findOne(userId);
    const userMerge = await this.userRepository.merge(user, { perfile });
    return (await this.userRepository.save(userMerge)).perfile;
  }
}
