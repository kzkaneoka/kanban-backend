import { Test, TestingModule } from '@nestjs/testing';
import { CardsRepository } from './cards.repository';

describe('CardsRepository', () => {
  let repository: CardsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsRepository],
    }).compile();

    repository = module.get<CardsRepository>(CardsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
