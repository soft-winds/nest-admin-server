import { Module } from '@nestjs/common';
import { EpubookService } from './epubook.service';
import { EpubookController } from './epubook.controller';

@Module({
  controllers: [EpubookController],
  providers: [EpubookService]
})
export class EpubookModule {}
