import { Logger, Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Injectable()
export class ColumnsService {
  constructor(
    private readonly logger: Logger,
    private readonly columnsRepository: ColumnsRepository,
  ) {}

  async create(createColumnDto: CreateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsService.create() createColumnDto=${JSON.stringify(
      createColumnDto,
    )}`;
    this.logger.log(message);

    // size of columns
    const size = await this.columnsRepository.size();

    // create column with order = size + 1
    return this.columnsRepository.create(createColumnDto, size + 1);
  }

  findAll(): Promise<ColumnModel[]> {
    const message = 'ColumnsService.findAll()';
    this.logger.log(message);
    return this.columnsRepository.findAll();
  }

  findOne(id: string): Promise<ColumnModel> {
    const message = `ColumnsService.findOne() id=${id}`;
    this.logger.log(message);
    return this.columnsRepository.findOne(id);
  }

  async update(
    id: string,
    updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnModel> {
    const message = `ColumnsService.update() id=${id} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);

    if (updateColumnDto.order !== undefined) {
      // fetch columns
      const columns = await this.columnsRepository.findWithSelectAndOrder();

      // find index of column to update
      const index = columns.findIndex((column) => column.id === id);

      // adjust order to fit between 1 <= order <= columns.length
      if (updateColumnDto.order < 1) {
        updateColumnDto.order = 1;
      } else if (updateColumnDto.order > columns.length) {
        updateColumnDto.order = columns.length;
      }

      // update orders of other columns
      if (updateColumnDto.order < columns[index].order) {
        for (let i = updateColumnDto.order - 1; i < index; ++i) {
          await this.columnsRepository.updateOrder(
            columns[i].id,
            columns[i].order + 1,
          );
        }
      } else if (updateColumnDto.order > columns[index].order) {
        for (let i = updateColumnDto.order - 1; i > index; --i) {
          await this.columnsRepository.updateOrder(
            columns[i].id,
            columns[i].order - 1,
          );
        }
      }
    }

    // update column
    return this.columnsRepository.update(id, updateColumnDto);
  }

  async remove(id: string): Promise<ColumnModel> {
    const message = `ColumnsService.remove() id=${id}`;
    this.logger.log(message);

    // fetch columns
    const columns = await this.columnsRepository.findWithSelectAndOrder();

    // find index of column to update
    const index = columns.findIndex((column) => column.id === id);

    // update orders of other columns
    for (let i = index + 1; i < columns.length; ++i) {
      await this.columnsRepository.updateOrder(
        columns[i].id,
        columns[i].order - 1,
      );
    }

    // remove column
    return this.columnsRepository.remove(id);
  }
}
