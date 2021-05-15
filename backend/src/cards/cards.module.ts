import { Logger, Module } from '@nestjs/common';
import { CardModel } from './models/card.model';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';

@Module({
  controllers: [CardsController],
  providers: [CardModel, CardsRepository, CardsService, Logger],
})
export class CardsModule {}
