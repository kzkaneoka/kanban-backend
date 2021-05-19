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
} from '@nestjs/common';
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
  create(@Body() createCardDto: CreateCardDto): Promise<CardModel> {
    const message = `CardsController.create() createCardDto=${JSON.stringify(
      createCardDto,
    )}`;
    this.logger.log(message);
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll(): Promise<CardModel[]> {
    const message = 'CardsController.findAll()';
    this.logger.log(message);
    return this.cardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CardModel> {
    const message = `CardsController.findOne() id=${id}`;
    this.logger.log(message);
    return this.cardsService.findOne(id);
  }

  @Put(':id')
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
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<CardModel> {
    const message = `CardsController.remove() id=${id}`;
    this.logger.log(message);
    return this.cardsService.remove(id);
  }
}
