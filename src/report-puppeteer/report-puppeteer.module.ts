import { Module } from '@nestjs/common';
import { ReportPuppeteerService } from './report-puppeteer.service';
import { ReportPuppeteerController } from './report-puppeteer.controller';

@Module({
  controllers: [ReportPuppeteerController],
  providers: [ReportPuppeteerService],
})
export class ReportPuppeteerModule {}
