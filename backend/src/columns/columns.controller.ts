import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  @Get()
  findAll(@Query() query): string {
    return `This action returns all columns with ${query}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a column with ${id}`;
  }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto): string {
    return `This action adds a new column with ${createColumnDto}`;
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
