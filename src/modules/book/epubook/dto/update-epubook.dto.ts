import { PartialType } from '@nestjs/mapped-types';
import { CreateEpubookDto } from './create-epubook.dto';

export class UpdateEpubookDto extends PartialType(CreateEpubookDto) {}
