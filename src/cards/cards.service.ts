import { Logger, Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardModel } from './models/card.model';

@Injectable()
export class CardsService {
  constructor(
    private readonly logger: Logger,
    private readonly cardsRepository: CardsRepository,
  ) {}

  async create(
    createCardDto: CreateCardDto,
    userId: string,
  ): Promise<CardModel> {
    const message = `CardsService.create() createCardDto=${JSON.stringify(
      createCardDto,
    )} userId=${userId}`;
    this.logger.log(message);

    // size of cards with same columnId
    const size = await this.cardsRepository.size(createCardDto.columnId);

    // create card with order = size + 1
    return this.cardsRepository.create(createCardDto, userId, size + 1);
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

  async update(id: string, updateCardDto: UpdateCardDto): Promise<CardModel> {
    const message = `CardsService.update() id=${id} updateCardDto=${JSON.stringify(
      updateCardDto,
    )}`;
    this.logger.log(message);

    if (updateCardDto.order !== undefined) {
      // fetch cards
      const cards = await this.cardsRepository.findWithSelectAndOrder(id);

      // find index of card to update
      const index = cards.findIndex((card) => card.id === id);

      // adjust order to fit between 1 <= order <= cards.length
      if (updateCardDto.order < 1) {
        updateCardDto.order = 1;
      } else if (updateCardDto.order > cards.length) {
        updateCardDto.order = cards.length;
      }

      // update orders of other cards
      if (updateCardDto.order < cards[index].order) {
        for (let i = updateCardDto.order - 1; i < index; ++i) {
          await this.cardsRepository.updateOrder(
            cards[i].id,
            cards[i].order + 1,
          );
        }
      } else if (updateCardDto.order > cards[index].order) {
        for (let i = updateCardDto.order - 1; i > index; --i) {
          await this.cardsRepository.updateOrder(
            cards[i].id,
            cards[i].order - 1,
          );
        }
      }
    }

    // update card
    return this.cardsRepository.update(id, updateCardDto);
  }

  async remove(id: string): Promise<CardModel> {
    const message = `CardsService.remove() id=${id}`;
    this.logger.log(message);

    // // fetch cards
    const cards = await this.cardsRepository.findWithSelectAndOrder(id);

    // find index of card to update
    const index = cards.findIndex((card) => card.id === id);

    // update orders of other cards
    for (let i = index + 1; i < cards.length; ++i) {
      await this.cardsRepository.updateOrder(cards[i].id, cards[i].order - 1);
    }

    // remove card
    return this.cardsRepository.remove(id);
  }
}
