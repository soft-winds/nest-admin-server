import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpubookService } from './epubook.service';
import { CreateEpubookDto } from './dto/create-epubook.dto';
import { UpdateEpubookDto } from './dto/update-epubook.dto';

@Controller('epubook')
export class EpubookController {
  constructor(private readonly epubookService: EpubookService) {}

  @Post()
  create(@Body() createEpubookDto: CreateEpubookDto) {
    return this.epubookService.create(createEpubookDto);
  }

  @Get()
  findAll() {
    return this.epubookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epubookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpubookDto: UpdateEpubookDto) {
    return this.epubookService.update(+id, updateEpubookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epubookService.remove(+id);
  }
}
