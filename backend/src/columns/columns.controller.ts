import {
  Body,
  Controller,
  Delete,
  Get,
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
  constructor(private columnService: ColumnsService) {}

  @Get()
  async findAll(): Promise<Column[]> {
    return this.columnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a column with ${id}`;
  }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    this.columnService.create(createColumnDto);
  }

  @Put(':id')
  update(@Param(':id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return `This action updates a column with ${updateColumnDto}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a column with ${id}`;
  }
}
