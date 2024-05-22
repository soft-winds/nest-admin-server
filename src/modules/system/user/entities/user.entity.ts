import { Base_Entities } from 'src/common/entities/common';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Perfile } from './perfile.entity';

@Entity('sys_user')
export class User extends Base_Entities {
  @Column({ comment: '用户名称', unique: true })
  username: string;

  @Column({ comment: '用户密码' })
  password: string;

  @JoinTable({ name: 'sys_user_role' })
  @ManyToMany(() => Role, (role) => role.user, { cascade: true })
  role: Role[];

  @JoinColumn({ name: 'perfile' })
  @OneToOne(() => Perfile, (perfile) => perfile.user, { cascade: true })
  perfile: Perfile;
}
