import { Module } from '@nestjs/common';
import { LogbookService } from './application/services/logbook.service';
import { LogbookController } from './api/logbook.controller';

@Module({
  controllers: [LogbookController],
  providers: [LogbookService],
})
export class LogbookModule {}
