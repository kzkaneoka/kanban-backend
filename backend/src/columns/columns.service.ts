import { Logger, Inject, Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Injectable()
export class ColumnsService {
  constructor(
    @Inject(ColumnsRepository) private readonly columnsRepository: any,
    private readonly logger: Logger,
  ) {}

  create(createColumnDto: CreateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsService.create() data=${JSON.stringify(
      createColumnDto,
    )}`;
    this.logger.log(message);
    const column = new ColumnModel();
    column.name = createColumnDto.name;
    return this.columnsRepository.create(column);
  }

  findAll(): Promise<ColumnModel[]> {
    const message = 'ColumnsService.findAll()';
    this.logger.log(message);
    return this.columnsRepository.findAll();
  }

  findById(id: string): Promise<ColumnModel> {
    const message = `ColumnsService.findById() id=${id}`;
    this.logger.log(message);
    return this.columnsRepository.findById(id);
  }

  update(id: string, updateColumnDto: UpdateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsService.update() id=${id} data=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);
    const name = updateColumnDto.name;
    const order = updateColumnDto.order;
    if (name !== undefined && order !== undefined) {
      return this.columnsRepository.updateNameAndOrder(id, name, order);
    } else if (name !== undefined) {
      return this.columnsRepository.updateName(id, name);
    } else if (order !== undefined) {
      return this.columnsRepository.updateOrder(id, order);
    } else {
      return this.columnsRepository.findById(id);
    }
  }

  remove(id: string): Promise<ColumnModel> {
    const message = `ColumnsService.remove() id=${id}`;
    this.logger.log(message);
    return this.columnsRepository.removeById(id);
  }
}
