import { Logger, Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Injectable()
export class ColumnsRepository {
  constructor(private readonly logger: Logger) {}

  async create(createColumnDto: CreateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsRepository.create() column=${JSON.stringify(
      createColumnDto,
    )}`;
    this.logger.log(message);
    const size = await ColumnModel.query().resultSize();
    return ColumnModel.query()
      .insert({ ...createColumnDto, order: size + 1 })
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

  findWithSelectAndOrder(): Promise<ColumnModel[]> {
    const message = 'ColumnsRepository.findWithSelectAndOrder()';
    this.logger.log(message);
    return ColumnModel.query().select('id', 'order').orderBy('order');
  }

  updateOrder(id: string, order: number): Promise<any> {
    const message = `ColumnsRepository.updateOrder() id=${id} order=${order}`;
    this.logger.log(message);
    return ColumnModel.query().patch({ order }).where('id', id);
  }

  update(id: string, updateColumnDto: UpdateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsRepository.update() id=${id}} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);
    return ColumnModel.query().updateAndFetchById(id, {
      ...updateColumnDto,
      updatedAt: new Date(),
    });
  }

  remove(id: string): Promise<ColumnModel> {
    const message = `ColumnsRepository.remove() id=${id}}`;
    this.logger.log(message);
    return ColumnModel.query().deleteById(id).returning('*').first();
  }
}
