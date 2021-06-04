import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import * as knexfile from '../../knexfile';
import { CardModel } from '../cards/models/card.model';
import { ColumnModel } from '../columns/models/column.model';

@Module({
  imports: [
    ObjectionModule.register({
      config: knexfile[process.env.NODE_ENV || 'development'],
    }),
    ObjectionModule.forFeature([CardModel, ColumnModel]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
