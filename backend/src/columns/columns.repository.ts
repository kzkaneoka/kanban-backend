import { Logger, Injectable } from '@nestjs/common';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Injectable()
export class ColumnsRepository {
  constructor(private readonly logger: Logger) {}

  async create(column: ColumnModel): Promise<ColumnModel> {
    const message = `ColumnsRepository.create() column=${JSON.stringify(
      column,
    )}`;
    this.logger.log(message);
    const size = await ColumnModel.query().resultSize();
    return ColumnModel.query()
      .insert({ ...column, order: size + 1 })
      .returning('*');
  }

  findAll(): Promise<ColumnModel[]> {
    const message = 'ColumnsRepository.findAll()';
    this.logger.log(message);
    return ColumnModel.query().orderBy('order');
  }

  findOne(id: string): Promise<ColumnModel> {
    const message = `ColumnsRepository.findOne() id=${id}`;
    this.logger.log(message);
    return ColumnModel.query().findById(id);
  }

  async updateWithOrder(
    id: string,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnModel> {
    const message = `ColumnsRepository.updateWithOrder() id=${id} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);

    // fetch columns
    const columns = await ColumnModel.query()
      .select('id', 'order')
      .orderBy('order');

    // adjust order to fit between 1 <= order <= columns.length
    let order = updateColumnDto.order;
    if (order < 1) {
      order = 1;
    } else if (order > columns.length) {
      order = columns.length;
    }

    // find index of column to update
    const index = columns.findIndex((column) => column.id === id);

    // update orders
    if (order < columns[index].order) {
      for (let i = order - 1; i < index; ++i) {
        await ColumnModel.query()
          .patch({ order: columns[i].order + 1 })
          .where('id', columns[i].id);
      }
    } else if (order > columns[index].order) {
      for (let i = order - 1; i > index; --i) {
        await ColumnModel.query()
          .patch({ order: columns[i].order - 1 })
          .where('id', columns[i].id);
      }
    }

    updateColumnDto.order = order;
    return ColumnModel.query().updateAndFetchById(id, {
      ...updateColumnDto,
      updatedAt: new Date(),
    });
  }

  updateWithOutOrder(
    id: string,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnModel> {
    const message = `ColumnsRepository.updateWithOutOrder() id=${id}} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);
    return ColumnModel.query().updateAndFetchById(id, {
      ...updateColumnDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<ColumnModel> {
    const message = `ColumnsRepository.remove() id=${id}}`;
    this.logger.log(message);

    // fetch columns
    const columns = await ColumnModel.query()
      .select('id', 'order')
      .orderBy('order');

    // find index of column to update
    const index = columns.findIndex((column) => column.id === id);

    // update orders
    for (let i = index + 1; i < columns.length; ++i) {
      await ColumnModel.query()
        .patch({ order: columns[i].order - 1 })
        .where('id', columns[i].id);
    }

    return ColumnModel.query().deleteById(id).returning('*').first();
  }
}
