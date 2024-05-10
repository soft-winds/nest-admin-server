import { Base_Entities } from 'src/common/entities/common';
import { Entity } from 'typeorm';

@Entity('sys_user')
export class User extends Base_Entities {}
