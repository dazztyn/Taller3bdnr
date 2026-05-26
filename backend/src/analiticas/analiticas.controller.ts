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

  @Get('compras-por-ciudad')
  async obtenerComprasCiudad(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerComprasPorCiudad(filtros);
  }

  @Get('ventas-por-fecha')
  async obtenerVentasFecha(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerVentasPorFecha(filtros);
  }

  @Get('metodos-pago')
  async obtenerMetodosPago(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerMetodosPago(filtros);
  }

  @Get('compras-por-rango-etario')
  async obtenerComprasRangoEtario(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerComprasPorRangoEtario(filtros);
  }

  @Get('productos-mas-vendidos')
  async obtenerProductosMasVendidos(@Query() filtros: FiltrosAnaliticas) {
    return await this.analiticasService.obtenerProductosMasVendidos(filtros);
  }
}