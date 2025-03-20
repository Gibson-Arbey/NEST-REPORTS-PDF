import { Body, Controller, Get, Res } from '@nestjs/common';
import { ReportPuppeteerService } from './report-puppeteer.service';
import { Response } from 'express';
import { GeneratePdfDto } from './dto/generatePdf.dto';

@Controller('report-puppeteer')
export class ReportPuppeteerController {
  constructor(private readonly reportPuppeteerService: ReportPuppeteerService) {}

  @Get('generate-pdf')
  async generate(@Body() generatePdfDto: GeneratePdfDto, @Res() res: Response) {

    const pdfBuffer = await this.reportPuppeteerService.generatePdf(generatePdfDto);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="documento.pdf"');
    res.send(pdfBuffer);
  }

  @Get('generate-img')
  async getScreenshot(@Res() res: Response) {
    const imageBuffer = await this.reportPuppeteerService.generateImage();

    // Configurar respuesta HTTP con la imagen en formato PNG
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  }
}
