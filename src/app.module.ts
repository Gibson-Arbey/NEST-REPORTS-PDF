import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrinterModule } from './printer/printer.module';
import { ReportPuppeteerModule } from './report-puppeteer/report-puppeteer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, ReportPuppeteerModule, StoreReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
