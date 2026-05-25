import { Module } from '@nestjs/common';
import { AnaliticasController } from './analiticas.controller';
import { AnaliticasService } from './analiticas.service';
import { ClickhouseModule } from '../clickhouse/clickhouse.module';

@Module({
  imports: [ClickhouseModule], 
  controllers: [AnaliticasController],
  providers: [AnaliticasService],
})
export class AnaliticasModule {}