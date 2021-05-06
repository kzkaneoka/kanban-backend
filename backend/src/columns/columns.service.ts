import { Injectable } from '@nestjs/common';

import { Column } from './interface/column.interface';

@Injectable()
export class ColumnsService {
  private readonly columns: Column[] = [];

  findAll(): Column[] {
    return this.columns;
  }

  create(column: Column) {
    this.columns.push(column);
  }
}
