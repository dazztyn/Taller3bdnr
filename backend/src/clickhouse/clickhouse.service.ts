import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { createClient, ClickHouseClient } from '@clickhouse/client';

@Injectable()
export class ClickhouseService implements OnModuleInit {
  private client!: ClickHouseClient;
  private readonly logger = new Logger(ClickhouseService.name);

  async onModuleInit() {
  this.client = createClient({
        url: 'http://localhost:8123',
        username: 'default',
        password: 'admin', // <-- Ahora usamos la contraseña forzada
        database: 'default',
      });
    await this.inicializarTabla();
  }

  private async inicializarTabla() {
    const query = `
      CREATE TABLE IF NOT EXISTS compras (
        usuarioid UInt32,
        edad UInt8,
        ciudad String,
        producto String,
        categoria String,
        precio Float32,
        fecha Date,
        hora String,
        metodopago String
      ) ENGINE = MergeTree()
      ORDER BY (fecha, ciudad, categoria);
    `;
    
    try {
      await this.client.command({ query });
      this.logger.log('Tabla "compras" verificada/creada en ClickHouse.');
    } catch (error) {
      this.logger.error('Error inicializando tabla en ClickHouse', error);
    }
  }

  getClient(): ClickHouseClient {
    return this.client;
  }
}