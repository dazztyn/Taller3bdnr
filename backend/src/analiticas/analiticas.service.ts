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

    // 4. Producto más vendido 
    const rsProducto = await client.query({ 
      query: `SELECT producto, count(*) as cantidad FROM compras ${where} GROUP BY producto ORDER BY cantidad DESC LIMIT 1` 
    });
    const productoTop = (await rsProducto.json()) as any;

    // 5. Ciudad con más compras 
    const rsCiudad = await client.query({ 
      query: `SELECT ciudad, count(*) as cantidad FROM compras ${where} GROUP BY ciudad ORDER BY cantidad DESC LIMIT 1` 
    });
    const ciudadTop = (await rsCiudad.json()) as any;

    // 6. Método de pago más utilizado 
    const rsMetodo = await client.query({ 
      query: `SELECT metodopago, count(*) as cantidad FROM compras ${where} GROUP BY metodopago ORDER BY cantidad DESC LIMIT 1` 
    });
    const metodoTop = (await rsMetodo.json()) as any;

    // Retornamos todos los KPIs consolidados
    return {
      totalVentas: totalVentas.data[0]?.total || 0,
      promedioGasto: totalVentas.data[0]?.total > 0 ? promedioGasto.data[0]?.promedio : 0,
      categoriaMasVendida: categoriaTop.data[0]?.categoria || null,
      productoMasVendido: productoTop.data[0]?.producto || null,
      ciudadConMasCompras: ciudadTop.data[0]?.ciudad || null,
      metodoPagoMasUtilizado: metodoTop.data[0]?.metodopago || null,
    };
  }

  // Ventas por categoría
  async obtenerVentasPorCategoria(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const rs = await this.chService.getClient().query({
      query: `SELECT categoria, count(*) as cantidad FROM compras ${where} GROUP BY categoria ORDER BY cantidad DESC`
    });
    return await rs.json();
  }

  // Compras por ciudad
  async obtenerComprasPorCiudad(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const rs = await this.chService.getClient().query({
      query: `SELECT ciudad, count(*) as cantidad FROM compras ${where} GROUP BY ciudad ORDER BY cantidad DESC`
    });
    return (await rs.json()) as any;
  }

  // Ventas por fecha [cite: 74]
  async obtenerVentasPorFecha(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const rs = await this.chService.getClient().query({
      query: `SELECT fecha, count(*) as cantidad FROM compras ${where} GROUP BY fecha ORDER BY fecha ASC`
    });
    return (await rs.json()) as any;
  }

  // Métodos de pago más usados
  async obtenerMetodosPago(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const rs = await this.chService.getClient().query({
      query: `SELECT metodopago, count(*) as cantidad FROM compras ${where} GROUP BY metodopago ORDER BY cantidad DESC`
    });
    return (await rs.json()) as any;
  }

  // Compras por rango etario 
  async obtenerComprasPorRangoEtario(filtros: FiltrosAnaliticas) {
    const where = this.construirWhere(filtros);
    const rs = await this.chService.getClient().query({
      query: `
        SELECT 
          CASE 
            WHEN edad < 18 THEN 'Menor a 18'
            WHEN edad BETWEEN 18 AND 25 THEN '18-25'
            WHEN edad BETWEEN 26 AND 35 THEN '26-35'
            WHEN edad BETWEEN 36 AND 50 THEN '36-50'
            ELSE 'Mayor a 50'
          END AS rango,
          count(*) as cantidad
        FROM compras ${where} 
        GROUP BY rango 
        ORDER BY min(edad) ASC
      `
    });
    return (await rs.json()) as any;
  }
}