import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base_Entities extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: '唯一标识' })
  id: string;

  @CreateDateColumn({
    comment: '创建时间',
    transformer: {
      to: (value: Date) => value.toISOString(),
      from: (value: string) => new Date(value),
    },
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
    transformer: {
      to: (value: Date) => value.toISOString(),
      from: (value: string) => new Date(value),
    },
  })
  updateTime: Date;
}
