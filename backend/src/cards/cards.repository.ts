import { Logger, Injectable } from '@nestjs/common';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardModel } from './models/card.model';

@Injectable()
export class CardsRepository {
  constructor(private readonly logger: Logger) {}

  async create(card: CardModel): Promise<CardModel> {
    const message = `CardsRepository.create() card=${JSON.stringify(card)}`;
    this.logger.log(message);
    const size = await CardModel.query()
      .where({ columnId: card.columnId })
      .resultSize();
    return CardModel.query()
      .insert({ ...card, order: size + 1 })
      .returning('*');
  }

  findAll(): Promise<CardModel[]> {
    const message = 'CardsRepository.findAll()';
    this.logger.log(message);
    return CardModel.query().orderBy([
      { column: 'columnId' },
      { column: 'order' },
    ]);
  }

  findOne(id: string): Promise<CardModel> {
    const message = `CardsRepository.findOne() id=${id}`;
    this.logger.log(message);
    return CardModel.query().findById(id);
  }

  async updateWithOrder(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardModel> {
    const message = `CardsRepository.updateWithOrder() id=${id} updateCardDto=${JSON.stringify(
      updateCardDto,
    )}`;
    this.logger.log(message);

    // fetch cards
    const card = await CardModel.query().findById(id).select('columnId');
    this.logger.log(`${JSON.stringify(card)}`);
    const cards = await CardModel.query()
      .where({ columnId: card.columnId })
      .select('id', 'order')
      .orderBy('order');

    // adjust order to fit between 1 <= order <= cards.length
    let order = updateCardDto.order;
    if (order < 1) {
      order = 1;
    } else if (order > cards.length) {
      order = cards.length;
    }

    // find index of card to update
    const index = cards.findIndex((card) => card.id === id);

    // update orders
    if (order < cards[index].order) {
      for (let i = order - 1; i < index; ++i) {
        await CardModel.query()
          .patch({ order: cards[i].order + 1 })
          .where('id', cards[i].id);
      }
    } else if (order > cards[index].order) {
      for (let i = order - 1; i > index; --i) {
        await CardModel.query()
          .patch({ order: cards[i].order - 1 })
          .where('id', cards[i].id);
      }
    }

    updateCardDto.order = order;
    return CardModel.query().updateAndFetchById(id, {
      ...updateCardDto,
      updatedAt: new Date(),
    });
  }

  updateWithOutOrder(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardModel> {
    const message = `CardsRepository.updateWithOutOrder() id=${id}} updateCardDto=${JSON.stringify(
      updateCardDto,
    )}`;
    this.logger.log(message);
    return CardModel.query().updateAndFetchById(id, {
      ...updateCardDto,
      updatedAt: new Date(),
    });
  }

  async remove(id: string): Promise<CardModel> {
    const message = `CardsRepository.remove() id=${id}}`;
    this.logger.log(message);

    // fetch cards
    const card = await CardModel.query().findById(id).select('columnId');
    const cards = await CardModel.query()
      .where({ columnId: card.columnId })
      .select('id', 'order')
      .orderBy('order');

    // find index of card to update
    const index = cards.findIndex((card) => card.id === id);

    // update orders
    for (let i = index + 1; i < cards.length; ++i) {
      await CardModel.query()
        .patch({ order: cards[i].order - 1 })
        .where('id', cards[i].id);
    }

    return CardModel.query().deleteById(id).returning('*').first();
  }
}
