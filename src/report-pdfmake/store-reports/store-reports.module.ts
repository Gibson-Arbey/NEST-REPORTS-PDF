import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterModule } from 'src/report-pdfmake/printer/printer.module';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
  imports: [PrinterModule]
})
export class StoreReportsModule {}
