import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './interface/column.interface';

@Controller('columns')
export class ColumnsController {
  constructor(
    private columnService: ColumnsService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(): Promise<Column[]> {
    this.logger.log('This action returns a list of columns');
    return this.columnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    this.logger.log(`This action returns a column with ${id}`);
  }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    this.logger.log(
      `This action creates a column with ${JSON.stringify(createColumnDto)}`,
    );
    this.columnService.create(createColumnDto);
  }

  @Put(':id')
  update(@Param(':id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    this.logger.log(
      `This action updates a column with ${id} and ${JSON.stringify(
        updateColumnDto,
      )}`,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`This action deletes a column with ${id}`);
  }
}
