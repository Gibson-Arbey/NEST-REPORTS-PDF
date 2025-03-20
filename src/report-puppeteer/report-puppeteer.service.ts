import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { GeneratePdfDto } from './dto/generatePdf.dto';

@Injectable()
export class ReportPuppeteerService {
  async generatePdf(generatePdfDto: GeneratePdfDto): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Cargar el contenido HTML recibido en el DTO
    await page.setContent(generatePdfDto.htmlContent, { waitUntil: 'load' });

    // Generar el PDF con las opciones recibidas en el DTO
    const pdfBuffer = await page.pdf({
      format: generatePdfDto.format,
      width: generatePdfDto.width,
      height: generatePdfDto.height,
      scale: generatePdfDto.scale,
      printBackground: generatePdfDto.printBackground,
      margin: generatePdfDto.margin,
      landscape: generatePdfDto.landscape,
    });

    await browser.close();

    // Convertir Uint8Array a Buffer y retornarlo
    return Buffer.from(pdfBuffer);
  }

  async generateImage(): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              background-color: #f4f4f4;
              text-align: center;
              width: 800px;
              height: 600px;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
            h1 {
              color: #32ac54;
              font-size: 32px;
            }
          </style>
        </head>
        <body>
          <h1>Hola desde Puppeteer</h1>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
    await page.setViewport({ width: 800, height: 600 });

    // Generar imagen en Buffer
    const imageBuffer = await page.screenshot({ type: 'png' });

    await browser.close();
    return Buffer.from(imageBuffer);
  }
}
