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
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/users/enum/role.enum';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnModel } from './models/column.model';

@Controller('columns')
@ApiTags('columns')
export class ColumnsController {
  constructor(
    private readonly logger: Logger,
    private readonly columnsService: ColumnsService,
  ) {}

  @Post()
  @Roles([Role.USER, Role.USER])
  @ApiBearerAuth()
  create(
    @Request() req,
    @Body() createColumnDto: CreateColumnDto,
  ): Promise<ColumnModel> {
    const message = `ColumnsController.create() createColumnDto=${JSON.stringify(
      createColumnDto,
    )} userId=${req.user.id}`;
    this.logger.log(message);
    return this.columnsService.create(createColumnDto, req.user.id);
  }

  @Get()
  @Public()
  findAll(): Promise<ColumnModel[]> {
    const message = 'ColumnsController.findAll()';
    this.logger.log(message);
    return this.columnsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiParam({
    name: 'id',
    description: 'UUID for a particular column',
    example: 'b02de89a-affe-4f7a-9473-bea67c104da8',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ColumnModel> {
    const message = `ColumnsController.findOne() id=${id}`;
    this.logger.log(message);
    return this.columnsService.findOne(id);
  }

  @Put(':id')
  @Roles([Role.USER, Role.USER])
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'UUID for a particular column',
    example: 'b02de89a-affe-4f7a-9473-bea67c104da8',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ): Promise<ColumnModel> {
    const message = `ColumnsController.update() id=${id} updateColumnDto=${JSON.stringify(
      updateColumnDto,
    )}`;
    this.logger.log(message);
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  @Roles([Role.USER, Role.USER])
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'UUID for a particular column',
    example: 'b02de89a-affe-4f7a-9473-bea67c104da8',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<ColumnModel> {
    const message = `ColumnsController.remove() id=${id}`;
    this.logger.log(message);
    return this.columnsService.remove(id);
  }
}
