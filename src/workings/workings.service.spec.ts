import { Test, TestingModule } from '@nestjs/testing';
import { WorkingsService } from './workings.service';

describe('WorkingsService', () => {
  let service: WorkingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkingsService],
    }).compile();

    service = module.get<WorkingsService>(WorkingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
