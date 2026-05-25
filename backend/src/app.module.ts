import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importa tus módulos creados:
import { ClickhouseModule } from './clickhouse/clickhouse.module';
import { EtlModule } from './etl/etl.module';
import { AnaliticasModule } from './analiticas/analiticas.module';

@Module({
  imports: [
    ClickhouseModule,
    EtlModule,
    AnaliticasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}