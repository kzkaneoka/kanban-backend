import { Test, TestingModule } from '@nestjs/testing';
import { ColumnsRepository } from './columns.repository';

describe('ColumnsRepository', () => {
  let repository: ColumnsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnsRepository],
    }).compile();

    repository = module.get<ColumnsRepository>(ColumnsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
