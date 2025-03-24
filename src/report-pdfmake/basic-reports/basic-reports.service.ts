import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/report-pdfmake/printer/printer.service';
import { getHelloWorldReport } from 'src/report-pdfmake/reports';
import { getEmploymentLetterReport } from '../reports/employment-letter.report';
import { getEmploymentLetterByIdReport } from '../reports/employment-letter-by-id.report';
import { getCountryReport } from '../reports/countries.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Conexion exitosa a la base de datos');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }
  hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Yuyis',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException(`El empleado con id ${employeeId} no existe`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Gibson Rodriguez',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'TECHFORGE SOLUTIONS',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });

    const docDefinition = getCountryReport({ countries });
    return this.printerService.createPdf(docDefinition);
  }
}
