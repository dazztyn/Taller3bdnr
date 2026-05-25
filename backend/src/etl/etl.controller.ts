import { Controller, Post, Body } from '@nestjs/common';
import { EtlService } from './etl.service';

@Controller('etl')
export class EtlController {
  constructor(private readonly etlService: EtlService) {}

  @Post('importar')
  async importarDatos(@Body('ruta') ruta: string) {
    return await this.etlService.importarDataset(ruta);
  }
}