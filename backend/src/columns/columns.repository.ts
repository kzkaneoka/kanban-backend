import { Logger, Injectable } from '@nestjs/common';
import { ColumnModel } from './models/column.model';

@Injectable()
export class ColumnsRepository {
  constructor(private readonly logger: Logger) {}

  findAll(): Promise<ColumnModel[]> {
    const message = 'ColumnsRepository.findAll()';
    this.logger.log(message);
    return ColumnModel.query().orderBy('order');
  }

  findById(id: string): Promise<ColumnModel> {
    const message = `ColumnsRepository.findById() id=${id}`;
    this.logger.log(message);
    return ColumnModel.query().findById(id);
  }

  async create(column: ColumnModel): Promise<ColumnModel> {
    const message = `ColumnsRepository.create() data=${JSON.stringify(column)}`;
    this.logger.log(message);
    const size = await ColumnModel.query().resultSize();
    return ColumnModel.query()
      .insert({ ...column, order: size + 1 })
      .returning('*');
  }

  async updateNameAndOrder(
    id: string,
    name: string,
    order: number,
  ): Promise<ColumnModel> {
    const message = `ColumnsRepository.updateNameAndOrder() id=${id} name=${name} order=${order}`;
    this.logger.log(message);

    // fetch columns
    const columns = await ColumnModel.query()
      .select('id', 'order')
      .orderBy('order');

    // adjust order to fit between 1 <= order <= columns.length
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

    return ColumnModel.query().updateAndFetchById(id, {
      name,
      order,
      updatedAt: new Date(),
    });
  }

  updateName(id: string, name: string): Promise<ColumnModel> {
    const message = `ColumnsRepository.updateName() id=${id} name=${name}`;
    this.logger.log(message);
    return ColumnModel.query().updateAndFetchById(id, {
      name,
      updatedAt: new Date(),
    });
  }

  async updateOrder(id: string, order: number): Promise<ColumnModel> {
    const message = `ColumnsRepository.updateOrder() id=${id} order=${order}`;
    this.logger.log(message);

    // fetch columns
    const columns = await ColumnModel.query()
      .select('id', 'order')
      .orderBy('order');

    // adjust order to fit between 1 <= order <= columns.length
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

    return ColumnModel.query().updateAndFetchById(id, {
      order,
      updatedAt: new Date(),
    });
  }

  async removeById(id: string): Promise<ColumnModel> {
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
