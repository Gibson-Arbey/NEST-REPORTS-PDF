import { Module } from '@nestjs/common';
import { BasicReportsModule } from './report-pdfmake/basic-reports/basic-reports.module';
import { PrinterModule } from './report-pdfmake/printer/printer.module';
import { ReportPuppeteerModule } from './report-puppeteer/report-puppeteer.module';
import { StoreReportsModule } from './report-pdfmake/store-reports/store-reports.module';
import { ExtraReportsModule } from './report-pdfmake/extra-reports/extra-reports.module';

@Module({
  imports: [BasicReportsModule, PrinterModule, ReportPuppeteerModule, StoreReportsModule, ExtraReportsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
