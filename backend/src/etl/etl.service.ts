import { Injectable, Logger } from '@nestjs/common';
import { ClickhouseService } from '../clickhouse/clickhouse.service';
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class EtlService {
  private readonly logger = new Logger(EtlService.name);

  constructor(private readonly chService: ClickhouseService) {}

  async importarDataset(filePath: string): Promise<any> {
    this.logger.log(`Iniciando importación desde: ${filePath}`);
    const BATCH_SIZE = 50000;
    let batch: any[] = [];
    let totalInsertados = 0;
    const csv = require('csv-parser');

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
          batch.push({
            usuarioid: Number(row.usuarioid),
            edad: Number(row.edad),
            ciudad: row.ciudad.trim(),
            producto: row.producto.trim(),
            categoria: row.categoria.trim(),
            precio: Number(row.precio),
            fecha: row.fecha.trim(),
            hora: row.hora.trim(),
            metodopago: row.metodopago.trim()
          });

          if (batch.length >= BATCH_SIZE) {
            const currentBatch = [...batch];
            batch = [];
            await this.insertarLote(currentBatch);
            totalInsertados += currentBatch.length;
            this.logger.log(`Filas insertadas: ${totalInsertados}`);
          }
        })
        .on('end', async () => {
          if (batch.length > 0) {
            await this.insertarLote(batch);
            totalInsertados += batch.length;
          }
          this.logger.log(`Importación finalizada. Total registros: ${totalInsertados}`);
          resolve({ message: 'Importación exitosa', totalInsertados });
        })
        .on('error', (error) => {
          this.logger.error('Error durante la lectura del CSV', error);
          reject(error);
        });
    });
  }

  async limpiarDatos() {
    this.logger.warn('Ejecutando TRUNCATE para vaciar la tabla de compras...');
    await this.chService.getClient().command({
      query: 'TRUNCATE TABLE compras',
    });
    this.logger.log('Tabla vaciada exitosamente.');
    return { message: 'Base de datos reiniciada. Lista para la demostración.' };
  }

  private async insertarLote(data: any[]) {
    await this.chService.getClient().insert({
      table: 'compras',
      values: data,
      format: 'JSONEachRow',
    });
  }
}