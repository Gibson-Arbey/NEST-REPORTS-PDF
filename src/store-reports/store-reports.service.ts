import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports/order-by-id.report';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
      await this.$connect();
    }
  
    constructor(private readonly printerService: PrinterService) {
      super();
    }


    async getOrderByIdReport(orderId: number) {
        const order = await this.orders.findUnique({
            where: {
              order_id: orderId,
            },
            include: {
              customers: true,
              order_details: {
                include: {
                  products: true,
                },
              },
            },
          });
      
          if (!order) {
            throw new NotFoundException(`La orden con id ${orderId} no existe`);
          }
      
          const docDefinition = orderByIdReport({
            data: order as any,
          });
      
          const doc = this.printerService.createPdf(docDefinition);
      
          return doc;
    }
}
