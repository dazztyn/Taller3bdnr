import { Module } from '@nestjs/common';
import { EtlController } from './etl.controller';
import { EtlService } from './etl.service';
import { ClickhouseModule } from '../clickhouse/clickhouse.module'; 

@Module({
  imports: [ClickhouseModule], 
  controllers: [EtlController],
  providers: [EtlService],
})
export class EtlModule {}
