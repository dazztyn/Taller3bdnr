import { Controller, Get, Query } from '@nestjs/common';
import { AnaliticasService, type FiltrosAnaliticas } from './analiticas.service';
@Controller('analiticas')
export class AnaliticasController {
  constructor(private readonly analiticasService: AnaliticasService) {}

  @Get('dashboard')
  async obtenerDashboard(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerKpisDashboard(filtros);
  }

  @Get('ventas-por-categoria')
  async obtenerVentasCategoria(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerVentasPorCategoria(filtros);
  }
}