import { Base_Entities } from 'src/common/entities/common';
import { Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('sys_role')
export class Role extends Base_Entities {
  @Column({ comment: '角色名称', unique: true })
  name: string;

  @Column({ comment: '角色值', unique: true })
  code: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '状态', type: 'tinyint', nullable: true, default: 1 })
  status: number;

  @ManyToMany(() => User, (user) => user.role, { onDelete: 'CASCADE' })
  user: User[];
}
