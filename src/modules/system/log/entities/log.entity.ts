import { Entity } from 'typeorm';
import { Base_Entities } from 'src/common/entities/common';

@Entity('sys_log')
export class Log extends Base_Entities {}
