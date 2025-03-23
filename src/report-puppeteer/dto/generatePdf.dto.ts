import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

class PdfMarginDto {
  @IsString()
  top: string;

  @IsString()
  right: string;

  @IsString()
  bottom: string;

  @IsString()
  left: string;
}

export class GeneratePdfDto {
  @IsString()
  @IsEnum([
    'letter',
    'legal',
    'tabloid',
    'ledger',
    'A0',
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
  ])
  format?:
    | 'letter'
    | 'legal'
    | 'tabloid'
    | 'ledger'
    | 'A0'
    | 'A1'
    | 'A2'
    | 'A3'
    | 'A4'
    | 'A5'
    | 'A6';

  @IsString()
  @IsOptional()
  width?: string = '210mm';

  @IsString()
  @IsOptional()
  height?: string = '297mm';

  @IsNumber()
  @IsOptional()
  scale?: number = 0.8;

  @IsBoolean()
  @IsOptional()
  printBackground?: boolean = true;

  @ValidateNested()
  @Type(() => PdfMarginDto)
  @IsOptional()
  margin?: PdfMarginDto = {
    top: '20mm',
    right: '10mm',
    bottom: '20mm',
    left: '10mm',
  };

  @IsBoolean()
  @IsOptional()
  landscape?: boolean = false;

  @IsString()
  htmlContent: string;

  @IsString()
  @IsOptional()
  header?: string;

  @IsString()
  @IsOptional()
  footer?: string;
}
