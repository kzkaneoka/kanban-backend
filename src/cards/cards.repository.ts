import { Logger, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardModel } from './models/card.model';

@Injectable()
export class CardsRepository {
  constructor(private readonly logger: Logger) {}

  create(
    createCardDto: CreateCardDto,
    userId: string,
    order: number,
  ): Promise<CardModel> {
    const message = `CardsRepository.create() card=${JSON.stringify(
      createCardDto,
    )} userId=${userId} order=${order}`;
    this.logger.log(message);
    return CardModel.query()
      .insert({ ...createCardDto, userId, order })
      .returning('*');
  }

  size(columnId: string): Promise<number> {
    const message = `CardsRepository.size() columnId=${columnId}`;
    this.logger.log(message);
    return CardModel.query().where({ columnId }).resultSize();
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

  async findWithSelectAndOrder(id: string): Promise<CardModel[]> {
    const message = `CardsRepository.findWithSelectAndOrder() id=${id}`;
    this.logger.log(message);
    const card = await CardModel.query().findById(id).select('columnId');
    return CardModel.query()
      .where({
        columnId: card.columnId,
      })
      .select('id', 'order')
      .orderBy('order');
  }

  updateOrder(id: string, order: number): Promise<any> {
    const message = `CardsRepository.updateOrder() id=${id} order=${order}`;
    this.logger.log(message);
    return CardModel.query().patch({ order: order }).where('id', id);
  }

  update(id: string, updateCardDto: UpdateCardDto): Promise<CardModel> {
    const message = `CardsRepository.update() id=${id}} updateCardDto=${JSON.stringify(
      updateCardDto,
    )}`;
    this.logger.log(message);
    return CardModel.query().updateAndFetchById(id, {
      ...updateCardDto,
      updatedAt: new Date(),
    });
  }

  remove(id: string): Promise<CardModel> {
    const message = `CardsRepository.remove() id=${id}}`;
    this.logger.log(message);
    return CardModel.query().deleteById(id).returning('*').first();
  }
}
