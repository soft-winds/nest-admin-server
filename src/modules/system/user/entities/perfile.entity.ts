import { Base_Entities } from 'src/common/entities/common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('sys_perfile')
export class Perfile extends Base_Entities {
  @Column({ comment: '昵称' })
  nicename: string;

  @Column({ comment: '头像' })
  avatar: string;

  @Column({ comment: '性别', type: 'tinyint' })
  gender: number;

  @Column({ comment: '邮箱' })
  email: string;

  @Column({ comment: '手机号' })
  phoneNumber: string;

  @Column({ comment: '地址' })
  address: string;

  @Column({ comment: '状态', type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @OneToOne(() => User, (user) => user.perfile, { onDelete: 'CASCADE' })
  user: User;
}
