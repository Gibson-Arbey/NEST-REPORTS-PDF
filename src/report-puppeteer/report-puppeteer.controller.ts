import { Controller, Get, Res } from '@nestjs/common';
import { ReportPuppeteerService } from './report-puppeteer.service';
import { Response } from 'express';

@Controller('report-puppeteer')
export class ReportPuppeteerController {
  constructor(private readonly reportPuppeteerService: ReportPuppeteerService) {}

  @Get('generate-pdf')
  async generate(@Res() res: Response) {
    const html = `
      <html>
      <head><title>PDF desde NestJS</title></head>
      <body>
        <h1 style="color: #327354;">Hola desde NestJS</h1>
        <p>Este es un PDF generado con Puppeteer</p>
      </body>
      </html>
    `;

    const pdfBuffer = await this.reportPuppeteerService.generatePdf(html);
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
