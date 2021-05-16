import { Logger, Injectable } from '@nestjs/common';
import { ColumnsRepository } from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Injectable()
export class ColumnsService {
  constructor(
    private readonly columnsRepository: ColumnsRepository,
    private readonly logger: Logger,
  ) {}

  create(createColumnDto: CreateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsService.create() createColumnDto=${JSON.stringify(
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

  findOne(id: string): Promise<ColumnModel> {
    const message = `ColumnsService.findOne() id=${id}`;
    this.logger.log(message);
    return this.columnsRepository.findOne(id);
  }

  update(id: string, updateColumnDto: UpdateColumnDto): Promise<ColumnModel> {
    const message = `ColumnsService.update() id=${id} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);
    if (updateColumnDto.order !== undefined) {
      return this.columnsRepository.updateWithOrder(id, updateColumnDto);
    } else {
      return this.columnsRepository.updateWithOutOrder(id, updateColumnDto);
    }
  }

  remove(id: string): Promise<ColumnModel> {
    const message = `ColumnsService.remove() id=${id}`;
    this.logger.log(message);
    return this.columnsRepository.remove(id);
  }
}
