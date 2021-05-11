import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

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
  async findAll(@Req() req: Request): Promise<Column[]> {
    const httpRequest = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;
    this.logger.log(`${httpRequest} - this action returns a list of columns`);
    return this.columnService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Req() req: Request,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): any {
    const httpRequest = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;
    this.logger.log(`${httpRequest} - this action returns a column`);
  }

  @Post()
  create(@Req() req: Request, @Body() createColumnDto: CreateColumnDto) {
    const httpRequest = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;
    this.logger.log(`${httpRequest} - this action creates a column`);
    this.columnService.create(createColumnDto);
  }

  @Put(':uuid')
  update(
    @Req() req: Request,
    @Param('uuid') uuid: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    const httpRequest = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;
    this.logger.log(`${httpRequest} - this action updates a column`);
  }

  @Delete(':uuid')
  remove(@Req() req: Request, @Param('uuid', ParseUUIDPipe) uuid: string) {
    const httpRequest = `${req.method} ${req.url} ${JSON.stringify(req.body)}`;
    this.logger.log(`${httpRequest} - this action deletes a column`);
  }
}
