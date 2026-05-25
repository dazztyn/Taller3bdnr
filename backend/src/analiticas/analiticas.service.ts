import { Injectable } from '@nestjs/common';
import { ClickhouseService } from '../clickhouse/clickhouse.service';

export interface FiltrosAnaliticas {
  ciudad?: string;
  categoria?: string;
  fecha?: string;
  metodopago?: string;
}

@Injectable()
export class AnaliticasService {
  constructor(private readonly chService: ClickhouseService) {}

  // Generador dinámico de la cláusula WHERE
  private construirWhere(filtros: FiltrosAnaliticas): string {
    const condiciones: string[] = [];
    if (filtros.ciudad) condiciones.push(`ciudad = '${filtros.ciudad}'`);
    if (filtros.categoria) condiciones.push(`categoria = '${filtros.categoria}'`);
    if (filtros.fecha) condiciones.push(`fecha = '${filtros.fecha}'`);
    if (filtros.metodopago) condiciones.push(`metodopago = '${filtros.metodopago}'`);

    return condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';
  }

  async obtenerKpisDashboard(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const client = this.chService.getClient();

// 1. Total de ventas
    const rsTotal = await client.query({ query: `SELECT count(*) as total FROM compras ${where}` });
    const totalVentas = (await rsTotal.json()) as any;

    // 2. Promedio de gasto
    const rsPromedio = await client.query({ query: `SELECT avg(precio) as promedio FROM compras ${where}` });
    const promedioGasto = (await rsPromedio.json()) as any;

    // 3. Categoría más vendida 
    const rsCategoria = await client.query({ 
      query: `SELECT categoria, count(*) as cantidad FROM compras ${where} GROUP BY categoria ORDER BY cantidad DESC LIMIT 1` 
    });
    const categoriaTop = (await rsCategoria.json()) as any;

    return {
      totalVentas: totalVentas.data[0]?.total || 0,
      promedioGasto: totalVentas.data[0]?.total > 0 ? promedioGasto.data[0]?.promedio : 0,
      categoriaMasVendida: categoriaTop.data[0]?.categoria || null
    };
  }

  // Ejemplo para gráfico: Ventas por categoría
  async obtenerVentasPorCategoria(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const rs = await this.chService.getClient().query({
      query: `SELECT categoria, count(*) as cantidad FROM compras ${where} GROUP BY categoria ORDER BY cantidad DESC`
    });
    return await rs.json();
  }
}