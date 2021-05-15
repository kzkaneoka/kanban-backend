import { Logger, Module } from '@nestjs/common';
import { ColumnModel } from './models/column.model';
import { ColumnsController } from './columns.controller';
import { ColumnsRepository } from './columns.repository';
import { ColumnsService } from './columns.service';

@Module({
  controllers: [ColumnsController],
  providers: [ColumnModel, ColumnsRepository, ColumnsService, Logger],
})
export class ColumnsModule {}
