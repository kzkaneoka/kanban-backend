import { Logger, Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardModel } from './models/card.model';

@Injectable()
export class CardsService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly logger: Logger,
  ) {}

  create(createCardDto: CreateCardDto): Promise<CardModel> {
    const message = `CardsService.create() data=${JSON.stringify(
      createCardDto,
    )}`;
    this.logger.log(message);
    const card = new CardModel();
    card.name = createCardDto.name;
    card.description = createCardDto.description;
    card.columnId = createCardDto.columnId;
    return this.cardsRepository.create(card);
  }

  findAll(): Promise<CardModel[]> {
    const message = 'CardsService.findAll()';
    this.logger.log(message);
    return this.cardsRepository.findAll();
  }

  findOne(id: string): Promise<CardModel> {
    const message = `CardsService.findOne() id=${id}`;
    this.logger.log(message);
    return this.cardsRepository.findOne(id);
  }

  update(id: string, updateCardDto: UpdateCardDto): Promise<CardModel> {
    const message = `CardsService.update() id=${id} data=${JSON.stringify(
      updateCardDto,
    )}`;
    this.logger.log(message);
    if (updateCardDto.order !== undefined) {
      return this.cardsRepository.updateWithOrder(id, updateCardDto);
    } else {
      return this.cardsRepository.updateWithOutOrder(id, updateCardDto);
    }
  }

  remove(id: string): Promise<CardModel> {
    const message = `CardsService.remove() id=${id}`;
    this.logger.log(message);
    return this.cardsRepository.remove(id);
  }
}
