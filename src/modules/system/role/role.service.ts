import { Injectable } from '@nestjs/common';
import { CreateRoleDto, QueryRoleDto, UpdateRoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const data = await this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(data);
  }

  async findAll(queryRoleDto: QueryRoleDto) {
    const { page, pageSize, name, code, status } = queryRoleDto;

    const where = {
      ...(name ? { name: Like(`%${name}%`) } : null),
      ...(code ? { code } : null),
      ...(status ? { status } : null),
    };
    const [data, total] = await this.roleRepository.findAndCount({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return { total, data };
  }

  findOne(id: number) {
    return this.roleRepository.findOne({ where: { id } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
