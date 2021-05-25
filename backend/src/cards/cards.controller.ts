import {
  Controller,
  Get,
  Logger,
  ParseUUIDPipe,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public-auth.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/users/enum/role.enum';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardModel } from './models/card.model';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly logger: Logger,
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  @Roles([Role.ADMIN, Role.USER])
  create(
    @Request() req,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardModel> {
    const message = `CardsController.create() createCardDto=${JSON.stringify(
      createCardDto,
    )} userId=${req.user.id}`;
    this.logger.log(message);
    return this.cardsService.create(createCardDto, req.user.id);
  }

  @Get()
  @Public()
  findAll(): Promise<CardModel[]> {
    const message = 'CardsController.findAll()';
    this.logger.log(message);
    return this.cardsService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CardModel> {
    const message = `CardsController.findOne() id=${id}`;
    this.logger.log(message);
    return this.cardsService.findOne(id);
  }

  @Put(':id')
  @Roles([Role.ADMIN, Role.USER])
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardModel> {
    const message = `CardsController.update() id=${id} updateCardDto=${JSON.stringify(
      updateCardDto,
    )}`;
    this.logger.log(message);
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @Roles([Role.ADMIN, Role.USER])
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<CardModel> {
    const message = `CardsController.remove() id=${id}`;
    this.logger.log(message);
    return this.cardsService.remove(id);
  }
}
