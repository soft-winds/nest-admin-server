import { Injectable } from '@nestjs/common';
import { CreateEpubookDto } from './dto/create-epubook.dto';
import { UpdateEpubookDto } from './dto/update-epubook.dto';

@Injectable()
export class EpubookService {
  create(createEpubookDto: CreateEpubookDto) {
    return 'This action adds a new epubook';
  }

  findAll() {
    return `This action returns all epubook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} epubook`;
  }

  update(id: number, updateEpubookDto: UpdateEpubookDto) {
    return `This action updates a #${id} epubook`;
  }

  remove(id: number) {
    return `This action removes a #${id} epubook`;
  }
}
